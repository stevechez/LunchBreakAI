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
		caller_name: 'Maria Lopez',
		caller_phone: '+1 831 555 0188',
		caller_email: 'maria.lopez@example.com',
		service_needed: 'AC not cooling — same day',
		job_location: 'Salinas, CA',
		summary:
			'Caller says the AC stopped working overnight. House is at 84 degrees with two young kids. Wants same-day service and asked for a ballpark on repairs.',
		urgency: 'emergency',
		estimated_value: 650,
		transcript: `AI: Hi, thanks for calling. The team is with a customer right now but I can get your request started. What is going on?

Caller: Our AC stopped working last night and the house is up to 84 degrees. We have two little kids and it is really hot.

AI: I am sorry to hear that. Is the unit running at all or is it completely off?

Caller: It turns on but just blows warm air.

AI: Got it. What city are you in?

Caller: Salinas, on the east side near Natividad.

AI: Thank you Maria. I am sending this to the team right now as urgent. Someone will call you back very shortly with availability and a ballpark on the repair.`,
		ai_summary:
			'Emergency HVAC lead. AC unit running but not cooling. Home at 84 degrees with young children. Located in Salinas. High intent, wants same-day service and pricing.',
	},
	{
		caller_name: 'James Carter',
		caller_phone: '+1 650 555 7710',
		caller_email: 'james.carter@example.com',
		service_needed: 'Water heater replacement quote',
		job_location: 'Watsonville, CA',
		summary:
			'Caller says water heater is leaking from the bottom. About 8 years old. Wants a quote for replacement and asked if same-week install is possible.',
		urgency: 'high',
		estimated_value: 1200,
		transcript: `AI: Thanks for calling. What can I help you with today?

Caller: My water heater is leaking from the bottom. I think it needs to be replaced.

AI: How old is the unit roughly?

Caller: About eight years old I think.

AI: Is it a gas or electric heater?

Caller: Gas.

AI: Got it. Are you looking for a quote on replacement?

Caller: Yes, and I want to know if you can do it this week. We have no hot water right now.

AI: Understood. What city are you in?

Caller: Watsonville, near the fairgrounds.

AI: Perfect. I am sending this over to the team now. They will call you back shortly with a quote and availability this week.`,
		ai_summary:
			'High-intent plumbing lead. Gas water heater leaking from bottom, approximately 8 years old. No hot water currently. Caller wants replacement quote and same-week install. Located in Watsonville.',
	},
	{
		caller_name: 'Karen Mitchell',
		caller_phone: '+1 408 555 4422',
		caller_email: 'karen.mitchell@example.com',
		service_needed: 'Roof leak inspection after rain',
		job_location: 'Aptos, CA',
		summary:
			"Caller noticed water stains on the ceiling after last week's rain. Wants an inspection and estimate before the next storm. Has a two-story house.",
		urgency: 'normal',
		estimated_value: 850,
		transcript: `AI: Thanks for calling. What is going on with your roof?

Caller: After the rain last week I noticed some water stains on my ceiling in the upstairs bedroom.

AI: Is water actively dripping or just staining?

Caller: Just staining right now but I am worried about the next rain.

AI: Makes sense. Is this a single story or two story home?

Caller: Two story. The stain is in the master bedroom.

AI: What city are you in?

Caller: Aptos, off Soquel Drive.

AI: Got it Karen. I am sending this to the team now so they can schedule an inspection and get you an estimate before the weather turns again.`,
		ai_summary:
			'Roofing inspection lead. Water stains appeared on upstairs ceiling after recent rain. Two-story home in Aptos. No active leak currently but caller is motivated to fix before next storm. Good opportunity.',
	},
	{
		caller_name: 'David Nguyen',
		caller_phone: '+1 831 555 3301',
		caller_email: 'david.nguyen@example.com',
		service_needed: 'Electrical panel upgrade quote',
		job_location: 'Santa Cruz, CA',
		summary:
			'Caller is adding an EV charger and was told by an electrician they need a panel upgrade first. Wants a quote. Home built in 1978 with original 100-amp panel.',
		urgency: 'normal',
		estimated_value: 2800,
		transcript: `AI: Thanks for calling. What electrical work are you looking to get done?

Caller: I am trying to add an EV charger in my garage but another electrician told me I need to upgrade my panel first.

AI: What size is your current panel?

Caller: I think 100 amps. The house was built in 1978.

AI: Got it. Are you looking for a quote on the panel upgrade and the charger together or just the panel?

Caller: Both together if possible. I want to know the total cost.

AI: What city are you in?

Caller: Santa Cruz, near Westside.

AI: Perfect. I am sending this to the team now. They will follow up with a quote that covers both the panel upgrade and the EV charger installation.`,
		ai_summary:
			'Electrical panel upgrade lead. 1978 home with 100-amp panel needs upgrade before EV charger install. Caller wants combined quote for panel and charger. Located on Westside Santa Cruz. High-value job.',
	},
	{
		caller_name: 'Sandra Reyes',
		caller_phone: '+1 408 555 9922',
		caller_email: 'sandra.reyes@example.com',
		service_needed: 'Deep cleaning before home sale',
		job_location: 'Capitola, CA',
		summary:
			'Caller is listing her home in three weeks and wants a deep clean including carpets, windows, and appliances. Three-bedroom, two-bath single story.',
		urgency: 'normal',
		estimated_value: 480,
		transcript: `AI: Thanks for calling. What kind of cleaning service are you looking for?

Caller: I am selling my house and I want a really thorough deep clean before we list it. Carpets, windows, all the appliances inside and out.

AI: How many bedrooms and bathrooms?

Caller: Three bedrooms, two bathrooms. Single story.

AI: When are you hoping to have it done by?

Caller: We are listing in about three weeks so sometime in the next two weeks would be great.

AI: What city is the home in?

Caller: Capitola.

AI: Great. I am sending this to the team now and they will follow up with availability and a quote for the full pre-listing deep clean.`,
		ai_summary:
			'Pre-listing deep clean lead. Three bed, two bath single story in Capitola. Needs carpets, windows, and appliances. Timeline is within two weeks before home listing. Motivated seller.',
	},
	{
		caller_name: 'Tom Becker',
		caller_phone: '+1 831 555 7788',
		caller_email: 'tom.becker@example.com',
		service_needed: 'Fence repair after storm damage',
		job_location: 'Scotts Valley, CA',
		summary:
			"Last week's wind knocked down about 30 feet of wood fence along the back property line. Caller wants a repair or replacement quote and asked about timing.",
		urgency: 'normal',
		estimated_value: 1400,
		transcript: `AI: Thanks for calling. What is going on?

Caller: We had that big wind storm last week and it took down a section of our fence in the backyard.

AI: About how much fencing came down?

Caller: Maybe 30 feet along the back. It is a wood fence.

AI: Is it completely down or just leaning?

Caller: Completely down. A couple of posts snapped at the base.

AI: Got it. Are you looking to repair what is there or replace that section?

Caller: Whatever makes more sense. I would like a quote for both if possible.

AI: What city are you in?

Caller: Scotts Valley.

AI: Thanks Tom. I am sending this to the team now and they will follow up with options and pricing for the repair and replacement.`,
		ai_summary:
			'Fence repair lead. Storm damage took down approximately 30 feet of wood fencing with snapped posts. Located in Scotts Valley. Caller open to repair or replacement and wants comparison quote. Good job size.',
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
		to_phone: '+18314329642',
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
