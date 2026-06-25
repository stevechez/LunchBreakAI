// src/app/api/webhooks/twilio/voice/recording/route.ts
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
	const url = new URL(request.url);

	const callId = url.searchParams.get('call_id');
	const leadId = url.searchParams.get('lead_id');

	const formData = await request.formData();

	const recordingUrl = String(formData.get('RecordingUrl') ?? '').trim();
	const recordingSid = String(formData.get('RecordingSid') ?? '').trim();
	const recordingDuration = String(
		formData.get('RecordingDuration') ?? '',
	).trim();

	console.log('Twilio recording callback received:', {
		callId,
		leadId,
		recordingUrl,
		recordingSid,
		recordingDuration,
	});

	if (!callId) {
		return twimlResponse(
			'Thank you. Your message was received, but we could not attach it to the call record.',
		);
	}

	const durationSeconds = Number(recordingDuration);
	const supabase = getServiceSupabase();

	const { error: callError } = await supabase
		.from('calls')
		.update({
			status: 'completed',
			recording_url: recordingUrl || null,
			duration_seconds: Number.isFinite(durationSeconds)
				? durationSeconds
				: null,
			ended_at: new Date().toISOString(),
			ai_summary: recordingUrl
				? 'Voicemail recording captured. Review the recording and follow up with the caller.'
				: 'Call completed. No recording URL was provided.',
		})
		.eq('id', callId);

	if (callError) {
		console.error('Failed to update call recording:', callError);

		return twimlResponse(
			'Thank you. Your message was received, but we could not update the call record.',
		);
	}

	if (leadId) {
		const { error: leadError } = await supabase
			.from('leads')
			.update({
				summary: recordingUrl
					? 'Real missed call captured with voicemail recording. Follow up with this caller as soon as possible.'
					: 'Real missed call captured. Follow up with this caller as soon as possible.',
			})
			.eq('id', leadId);

		if (leadError) {
			console.error('Failed to update lead after recording:', leadError);
		}
	}

	return twimlResponse(
		'Thank you. We will pass this message to the team right away.',
	);
}
