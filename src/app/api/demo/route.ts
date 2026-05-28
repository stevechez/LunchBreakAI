// src/app/api/demo/create-lead/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

async function getCurrentBusinessId() {
	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		return { error: 'Not authenticated' as const };
	}

	const { data: membership, error: membershipError } = await supabase
		.from('business_members')
		.select('business_id')
		.eq('user_id', user.id)
		.limit(1)
		.maybeSingle();

	if (membershipError || !membership) {
		return { error: 'No business found' as const };
	}

	return { businessId: membership.business_id };
}

export async function POST() {
	const supabase = await createClient();
	const current = await getCurrentBusinessId();

	if ('error' in current) {
		return NextResponse.json({ error: current.error }, { status: 401 });
	}

	const { data: lead, error: leadError } = await supabase
		.from('leads')
		.insert({
			business_id: current.businessId,
			caller_name: 'Steve Maciaszek',
			caller_phone: '+1 650 555 1212',
			caller_email: 'steve@example.com',
			service_needed: '2-bedroom apartment move',
			job_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
				.toISOString()
				.slice(0, 10),
			job_location: 'Mountain View, CA',
			destination_location: 'San Jose, CA',
			summary:
				'Caller needs a 2-bedroom apartment move from Mountain View to San Jose next Friday. Elevator access at pickup, stairs at drop-off. Wants a quote today.',
			urgency: 'high',
			status: 'new',
			estimated_value: 1200,
			source: 'demo_ai_receptionist',
		})
		.select('id')
		.single();

	if (leadError || !lead) {
		return NextResponse.json(
			{ error: leadError?.message ?? 'Failed to create lead' },
			{ status: 500 },
		);
	}

	const { error: callError } = await supabase.from('calls').insert({
		business_id: current.businessId,
		lead_id: lead.id,
		provider: 'demo',
		provider_call_id: `demo-${crypto.randomUUID()}`,
		direction: 'inbound',
		from_phone: '+1 650 555 1212',
		to_phone: '+1 650 555 3434',
		status: 'completed',
		duration_seconds: 96,
		transcript: `AI: Thanks for calling. I can help get your move request started. What date are you looking to move?

Caller: Next Friday.

AI: Great. What are you moving?

Caller: A two-bedroom apartment from Mountain View to San Jose.

AI: Do you have elevator access or stairs?

Caller: Elevator at pickup, stairs at drop-off.

AI: Thanks. I will send this to the team so they can follow up with a quote.`,
		ai_summary:
			'High-intent moving lead. Needs a 2-bedroom move from Mountain View to San Jose next Friday. Elevator at pickup, stairs at drop-off. Wants quote today.',
		started_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
		ended_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
	});

	if (callError) {
		return NextResponse.json({ error: callError.message }, { status: 500 });
	}

	return NextResponse.json({ leadId: lead.id });
}
