// src/app/api/webhooks/twilio/voice/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function getServiceSupabase() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !serviceRoleKey) {
		throw new Error('Missing Supabase service role env vars');
	}

	return createClient(supabaseUrl, serviceRoleKey);
}

function twimlResponse(message: string) {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="alice">${message}</Say>
  <Record maxLength="60" transcribe="false" playBeep="true" />
  <Say voice="alice">Thank you. We will pass this to the team right away.</Say>
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

	// Match the Twilio number to the business notification/assigned number.
	// For now this assumes businesses.notification_phone stores the Lunch Break AI/Twilio number.
	const { data: business, error: businessError } = await supabase
		.from('businesses')
		.select('id, name')
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

	const { error: callError } = await supabase.from('calls').insert({
		business_id: business.id,
		lead_id: lead.id,
		provider: 'twilio',
		provider_call_id: callSid,
		direction: 'inbound',
		from_phone: fromPhone,
		to_phone: toPhone,
		status: 'received',
		duration_seconds: null,
		transcript: null,
		ai_summary:
			'Real inbound call captured. No AI transcript yet. Caller should be contacted quickly.',
		recording_url: null,
		started_at: new Date().toISOString(),
		ended_at: null,
	});

	if (callError) {
		console.error('Call insert failed:', callError);
	}

	return twimlResponse(
		'Thanks for calling. The team may be helping another customer right now. Please leave a short message after the beep, and we will send this to the team right away.',
	);
}
