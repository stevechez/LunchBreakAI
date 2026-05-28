// src/app/api/webhooks/voice/intake/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendLeadEmailNotification } from '@/lib/notifications/send-lead-email';
import { sendLeadSmsNotification } from '@/lib/notifications/send-lead-sms';

export const runtime = 'nodejs';

type VoiceIntakePayload = {
	business_id?: string;

	provider?: string;
	provider_call_id?: string;

	from_phone?: string;
	to_phone?: string;

	caller_name?: string;
	caller_email?: string;
	service_needed?: string;

	job_date?: string;
	job_location?: string;
	destination_location?: string;

	summary?: string;
	urgency?: 'low' | 'normal' | 'high' | 'emergency';
	estimated_value?: number;

	transcript?: string;
	ai_summary?: string;
	recording_url?: string;

	duration_seconds?: number;
	started_at?: string;
	ended_at?: string;
};

function getServiceSupabase() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !serviceRoleKey) {
		throw new Error('Missing Supabase service role env vars');
	}

	return createClient(supabaseUrl, serviceRoleKey);
}

function verifyVoiceWebhook(request: Request) {
	const expectedSecret = process.env.VOICE_WEBHOOK_SECRET;
	const receivedSecret = request.headers.get('x-lunchbreak-secret');

	if (!expectedSecret || !receivedSecret) {
		return false;
	}

	return expectedSecret === receivedSecret;
}

function normalizeUrgency(value?: string) {
	if (
		value === 'low' ||
		value === 'normal' ||
		value === 'high' ||
		value === 'emergency'
	) {
		return value;
	}

	return 'normal';
}

export async function POST(request: Request) {
	if (!verifyVoiceWebhook(request)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const payload = (await request
		.json()
		.catch(() => null)) as VoiceIntakePayload | null;

	if (!payload) {
		return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
	}

	if (!payload.business_id) {
		return NextResponse.json(
			{ error: 'business_id is required' },
			{ status: 400 },
		);
	}

	const supabase = getServiceSupabase();

	const { data: business, error: businessError } = await supabase
		.from('businesses')
		.select('id')
		.eq('id', payload.business_id)
		.single();

	if (businessError || !business) {
		return NextResponse.json({ error: 'Business not found' }, { status: 404 });
	}

	const { data: lead, error: leadError } = await supabase
		.from('leads')
		.insert({
			business_id: payload.business_id,

			caller_name: payload.caller_name ?? null,
			caller_phone: payload.from_phone ?? null,
			caller_email: payload.caller_email ?? null,

			service_needed: payload.service_needed ?? null,
			job_date: payload.job_date ?? null,
			job_location: payload.job_location ?? null,
			destination_location: payload.destination_location ?? null,

			summary: payload.summary ?? payload.ai_summary ?? null,
			urgency: normalizeUrgency(payload.urgency),
			status: 'new',

			estimated_value: payload.estimated_value ?? null,
			source: payload.provider ?? 'voice_webhook',
		})
		.select('id')
		.single();

	if (leadError || !lead) {
		return NextResponse.json(
			{ error: 'Failed to create lead', details: leadError?.message },
			{ status: 500 },
		);
	}

	const { data: call, error: callError } = await supabase
		.from('calls')
		.insert({
			business_id: payload.business_id,
			lead_id: lead.id,

			provider: payload.provider ?? 'unknown',
			provider_call_id: payload.provider_call_id ?? null,
			direction: 'inbound',

			from_phone: payload.from_phone ?? null,
			to_phone: payload.to_phone ?? null,

			status: 'completed',
			duration_seconds: payload.duration_seconds ?? null,

			transcript: payload.transcript ?? null,
			ai_summary: payload.ai_summary ?? payload.summary ?? null,
			recording_url: payload.recording_url ?? null,

			started_at: payload.started_at ?? null,
			ended_at: payload.ended_at ?? null,
		})
		.select('id')
		.single();

	if (callError || !call) {
		return NextResponse.json(
			{ error: 'Failed to create call', details: callError?.message },
			{ status: 500 },
		);
	}

	const emailNotificationResult = await sendLeadEmailNotification({
		supabase,
		businessId: payload.business_id,
		leadId: lead.id,
		callId: call.id,
	});

	const smsNotificationResult = await sendLeadSmsNotification({
		supabase,
		businessId: payload.business_id,
		leadId: lead.id,
		callId: call.id,
	});

	return NextResponse.json({
		ok: true,
		lead_id: lead.id,
		call_id: call.id,
		notifications: {
			email: emailNotificationResult,
			sms: smsNotificationResult,
		},
	});
}
