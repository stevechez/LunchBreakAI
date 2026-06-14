// src/app/api/demo/create-lead/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

type DemoLeadScenario = {
	caller_name: string;
	caller_phone: string;
	caller_email: string;
	service_needed: string;
	job_location: string;
	summary: string;
	urgency: 'low' | 'normal' | 'high' | 'emergency';
	estimated_value: number;
	transcript: string;
	ai_summary: string;
};

const demoScenarios: DemoLeadScenario[] = [
	{
		caller_name: 'Demo Homeowner',
		caller_phone: '+1 408 555 1234',
		caller_email: 'demo.homeowner@example.com',
		service_needed: 'Garage door spring repair',
		job_location: 'Aptos, CA',
		summary:
			'Caller missed the business during lunch. Their garage door will not open, they believe the spring broke, and their car is stuck inside.',
		urgency: 'high',
		estimated_value: 450,
		transcript: `AI: Thanks for calling. The team may be helping another customer, but I can get your request started. What can we help with?

Caller: My garage door will not open. I think the spring broke.

AI: Is the car stuck inside or outside?

Caller: Inside. I need someone as soon as possible.

AI: What city are you in?

Caller: Aptos.

AI: Got it. I will send this to the team right away so they can follow up with availability and pricing.`,
		ai_summary:
			'High-intent missed-call lead. Garage door will not open, possible broken spring, car stuck inside, located in Aptos. Caller wants urgent service.',
	},
	{
		caller_name: 'Maria Lopez',
		caller_phone: '+1 831 555 0188',
		caller_email: 'maria@example.com',
		service_needed: 'Garage door opener replacement',
		job_location: 'Santa Cruz, CA',
		summary:
			'Caller says the opener is grinding and only works sometimes. They want pricing for repair versus replacement.',
		urgency: 'normal',
		estimated_value: 650,
		transcript: `AI: Thanks for calling. I can help get your garage door request started. What seems to be happening?

Caller: My opener keeps grinding and sometimes it will not lift the door.

AI: Understood. Are you looking for repair or replacement?

Caller: I would like to know both options.

AI: What city are you in?

Caller: Santa Cruz.

AI: Great. I will send this to the team so they can follow up with pricing and availability.`,
		ai_summary:
			'Garage door opener issue. Caller wants repair-versus-replacement pricing. Located in Santa Cruz. Moderate urgency.',
	},
	{
		caller_name: 'James Carter',
		caller_phone: '+1 650 555 7710',
		caller_email: 'james@example.com',
		service_needed: 'Garage door off track',
		job_location: 'San Jose, CA',
		summary:
			'Caller backed into the garage door and knocked it off track. They are worried the door may fall and want same-day help.',
		urgency: 'emergency',
		estimated_value: 850,
		transcript: `AI: Thanks for calling. What can we help with?

Caller: I backed into my garage door and now it is crooked and off the track.

AI: Is the door stuck open or closed?

Caller: Half open. I am worried it might fall.

AI: What city are you in?

Caller: San Jose.

AI: Got it. I will mark this as urgent and send it to the team right away.`,
		ai_summary:
			'Emergency garage door lead. Door is off track and partially open after impact. Safety concern. Located in San Jose.',
	},
	{
		caller_name: 'Karen Mitchell',
		caller_phone: '+1 408 555 4422',
		caller_email: 'karen@example.com',
		service_needed: 'Noisy garage door inspection',
		job_location: 'Capitola, CA',
		summary:
			'Caller says the garage door has become very loud and shaky. They want an inspection before it becomes a bigger repair.',
		urgency: 'normal',
		estimated_value: 225,
		transcript: `AI: Thanks for calling. What issue are you having with your garage door?

Caller: It has become really loud and shaky when it opens.

AI: Is it still opening and closing?

Caller: Yes, but it sounds bad.

AI: What city are you in?

Caller: Capitola.

AI: Thanks. I will send this to the team so they can follow up about an inspection.`,
		ai_summary:
			'Garage door inspection lead. Door is loud and shaky but still operating. Located in Capitola. Good preventative service opportunity.',
	},
];

function pickDemoScenario() {
	return demoScenarios[Math.floor(Math.random() * demoScenarios.length)];
}

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

	const scenario = pickDemoScenario();

	const now = new Date();
	const startedAt = new Date(now.getTime() - 6 * 60 * 1000).toISOString();
	const endedAt = new Date(now.getTime() - 4 * 60 * 1000).toISOString();

	const { data: lead, error: leadError } = await supabase
		.from('leads')
		.insert({
			business_id: current.businessId,
			caller_name: scenario.caller_name,
			caller_phone: scenario.caller_phone,
			caller_email: scenario.caller_email,
			service_needed: scenario.service_needed,
			job_date: new Date(Date.now() + 24 * 60 * 60 * 1000)
				.toISOString()
				.slice(0, 10),
			job_location: scenario.job_location,
			destination_location: null,
			summary: scenario.summary,
			urgency: scenario.urgency,
			status: 'new',
			estimated_value: scenario.estimated_value,
			source: 'missed_call_demo',
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
		from_phone: scenario.caller_phone,
		to_phone: '+1 866 555 3434',
		status: 'completed',
		duration_seconds: 82,
		transcript: scenario.transcript,
		ai_summary: scenario.ai_summary,
		recording_url: null,
		started_at: startedAt,
		ended_at: endedAt,
	});

	if (callError) {
		return NextResponse.json({ error: callError.message }, { status: 500 });
	}

	return NextResponse.json({ leadId: lead.id });
}
