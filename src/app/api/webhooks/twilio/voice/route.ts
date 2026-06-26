// src/app/api/webhooks/twilio/voice/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendLeadEmailNotification } from '@/lib/notifications/send-lead-email';
import { sendLeadSmsNotification } from '@/lib/notifications/send-lead-sms';

export const runtime = 'nodejs';

function escapeXml(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

function getServiceSupabase() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !serviceRoleKey) {
		throw new Error('Missing Supabase service role env vars');
	}

	return createClient(supabaseUrl, serviceRoleKey);
}

function twimlResponse(message: string, recordingActionUrl?: string) {
	const recordAction = recordingActionUrl
		? ` action="${escapeXml(recordingActionUrl)}" method="POST"`
		: '';

	const transcribeCallback = recordingActionUrl
		? ` transcribeCallback="${escapeXml(recordingActionUrl)}"`
		: '';

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna-Neural">${escapeXml(message)}</Say>
  <Record maxLength="60" transcribe="true"${transcribeCallback} playBeep="true"${recordAction} />
  <Say voice="Polly.Joanna-Neural">Thank you. We will get back to you shortly.</Say>
  <Hangup />
</Response>`;

	return new NextResponse(xml, {
		status: 200,
		headers: {
			'Content-Type': 'text/xml',
		},
	});
}

export async function POST(request: Request) {
	const formData = await request.formData();

	const fromPhone = String(formData.get('From') ?? '').trim();
	const toPhone = String(formData.get('To') ?? '').trim();
	const callSid = String(formData.get('CallSid') ?? '').trim();

	if (!fromPhone || !toPhone || !callSid) {
		return twimlResponse(
			'Sorry, we could not capture your call details. Please try again later.',
		);
	}

	const supabase = getServiceSupabase();

	const { data: business, error: businessError } = await supabase
		.from('businesses')
		.select('id, name, twilio_phone_number')
		.eq('twilio_phone_number', toPhone)
		.maybeSingle();

	if (businessError || !business) {
		console.error('Business lookup failed:', businessError);

		return twimlResponse(
			'Thanks for calling. The team is unavailable right now, but your call has been received.',
		);
	}

	const { data: lead, error: leadError } = await supabase
		.from('leads')
		.insert({
			business_id: business.id,
			caller_name: 'Unknown caller',
			caller_phone: fromPhone,
			caller_email: null,
			service_needed: 'Missed call',
			job_date: null,
			job_location: null,
			destination_location: null,
			summary:
				'Real inbound call captured by Lunch Break AI. Follow up with this caller as soon as possible.',
			urgency: 'normal',
			status: 'new',
			estimated_value: null,
			source: 'twilio_voice',
		})
		.select('id')
		.single();

	if (leadError || !lead) {
		console.error('Lead insert failed:', leadError);

		return twimlResponse(
			'Thanks for calling. The team is unavailable right now, but your call has been received.',
		);
	}

	const { data: call, error: callError } = await supabase
		.from('calls')
		.insert({
			business_id: business.id,
			lead_id: lead.id,
			provider: 'twilio',
			provider_call_id: callSid,
			direction: 'inbound',
			from_phone: fromPhone,
			to_phone: toPhone,
			status: 'missed',
			duration_seconds: null,
			transcript: null,
			ai_summary: 'Real inbound call captured. Transcription pending.',
			recording_url: null,
			started_at: new Date().toISOString(),
			ended_at: null,
		})
		.select('id')
		.single();

	if (callError || !call) {
		console.error('Call insert failed:', callError);

		return twimlResponse(
			'Thanks for calling. The team is unavailable right now, but your call has been received.',
		);
	}

	Promise.all([
		sendLeadEmailNotification({
			supabase,
			businessId: business.id,
			leadId: lead.id,
			callId: call.id,
		}),
		sendLeadSmsNotification({
			supabase,
			businessId: business.id,
			leadId: lead.id,
			callId: call.id,
		}),
	]).catch(err => {
		console.error('Notification failed:', err);
	});

	const appUrl = process.env.NEXT_PUBLIC_APP_URL;

	const recordingActionUrl = appUrl
		? `${appUrl}/api/webhooks/twilio/voice/recording?call_id=${encodeURIComponent(
				call.id,
			)}&lead_id=${encodeURIComponent(lead.id)}`
		: undefined;

	return twimlResponse(
		'Hi, thanks for calling. We are with a customer right now but we do not want to miss you. Please leave a quick message after the beep and someone will get back to you shortly.',
		recordingActionUrl,
	);
}
