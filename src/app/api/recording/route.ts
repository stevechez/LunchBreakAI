import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const recordingUrl = url.searchParams.get('url');

	if (!recordingUrl) {
		return new NextResponse('Missing url', { status: 400 });
	}

	const accountSid = process.env.TWILIO_ACCOUNT_SID;
	const authToken = process.env.TWILIO_AUTH_TOKEN;

	if (!accountSid || !authToken) {
		return new NextResponse('Missing Twilio credentials', { status: 500 });
	}

	const credentials = Buffer.from(`${accountSid}:${authToken}`).toString(
		'base64',
	);

	const response = await fetch(`${recordingUrl}.mp3`, {
		headers: {
			Authorization: `Basic ${credentials}`,
		},
	});

	if (!response.ok) {
		return new NextResponse('Recording not found', { status: 404 });
	}

	const audioBuffer = await response.arrayBuffer();

	return new NextResponse(audioBuffer, {
		headers: {
			'Content-Type': 'audio/mpeg',
			'Cache-Control': 'private, max-age=3600',
		},
	});
}
