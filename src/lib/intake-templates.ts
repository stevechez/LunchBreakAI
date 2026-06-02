// src/lib/intake-templates.ts

export type IntakeTemplateKey = 'movers' | 'plumbers' | 'hvac' | 'roofers';

export type IntakeTemplate = {
	key: IntakeTemplateKey;
	label: string;
	industry: string;
	scriptName: string;
	description: string;
	prompt: string;
	requiredFields: string[];
	customQuestions: string[];
};

export const intakeTemplates: IntakeTemplate[] = [
	{
		key: 'movers',
		label: 'Movers',
		industry: 'movers',
		scriptName: 'Moving Company Intake Script',
		description:
			'Capture move date, pickup, destination, home size, stairs/elevator access, packing help, and urgency.',
		prompt: `You are a friendly, concise AI receptionist for a moving company.

Your job is to answer when the business is unavailable, collect the caller's moving details, and send a clear lead summary to the team.

Ask one question at a time. Capture:
- caller name
- callback phone number
- move date
- pickup city/address
- destination city/address
- home or apartment size
- stairs or elevator access
- packing help needed
- urgency
- best callback time

Do not quote exact prices.
Do not promise availability.
Do not claim to be human.
Do not book the job.
End by confirming that the team will follow up as soon as possible.`,
		requiredFields: [
			'caller_name',
			'caller_phone',
			'service_needed',
			'urgency',
			'job_location',
			'destination_location',
			'preferred_timing',
			'move_date',
			'home_size',
			'stairs_or_elevator',
			'packing_help',
			'best_callback_time',
		],
		customQuestions: [
			'What date are you looking to move?',
			'What city or address are you moving from?',
			'What city or address are you moving to?',
			'How many bedrooms or how large is the move?',
			'Are there stairs or elevator access at either location?',
			'Do you need help with packing?',
			'How soon do you need a quote?',
			'What is the best callback number?',
		],
	},
	{
		key: 'plumbers',
		label: 'Plumbers',
		industry: 'plumbers',
		scriptName: 'Plumbing Intake Script',
		description:
			'Capture issue type, urgency, location, water shutoff status, photos availability, and callback details.',
		prompt: `You are a friendly, concise AI receptionist for a plumbing company.

Your job is to answer when the business is unavailable, collect the caller's plumbing issue, and send a clear lead summary to the team.

Ask one question at a time. Capture:
- caller name
- callback phone number
- service needed
- issue description
- job location
- urgency
- whether water is actively leaking
- whether water has been shut off
- best callback time

Do not quote exact prices.
Do not promise availability.
Do not diagnose beyond basic intake.
Do not claim to be human.
Do not book the job.
End by confirming that the team will follow up as soon as possible.`,
		requiredFields: [
			'caller_name',
			'caller_phone',
			'service_needed',
			'urgency',
			'job_location',
			'issue_description',
			'active_leak',
			'water_shut_off',
			'best_callback_time',
		],
		customQuestions: [
			'What plumbing issue are you calling about?',
			'Is water actively leaking right now?',
			'Have you been able to shut off the water?',
			'What is the job address or city?',
			'How urgent is this?',
			'What is the best callback number?',
		],
	},
	{
		key: 'hvac',
		label: 'HVAC',
		industry: 'hvac',
		scriptName: 'HVAC Intake Script',
		description:
			'Capture heating/cooling issue, system type, urgency, property location, and comfort impact.',
		prompt: `You are a friendly, concise AI receptionist for an HVAC company.

Your job is to answer when the business is unavailable, collect the caller's heating or cooling issue, and send a clear lead summary to the team.

Ask one question at a time. Capture:
- caller name
- callback phone number
- heating or cooling issue
- job location
- system type if known
- whether the system is running at all
- urgency
- best callback time

Do not quote exact prices.
Do not promise availability.
Do not diagnose beyond basic intake.
Do not claim to be human.
Do not book the job.
End by confirming that the team will follow up as soon as possible.`,
		requiredFields: [
			'caller_name',
			'caller_phone',
			'service_needed',
			'urgency',
			'job_location',
			'system_type',
			'system_running',
			'best_callback_time',
		],
		customQuestions: [
			'Are you calling about heating, cooling, or both?',
			'Is the system running at all?',
			'Do you know what type of system you have?',
			'What city or address is the job located in?',
			'How urgent is this?',
			'What is the best callback number?',
		],
	},
	{
		key: 'roofers',
		label: 'Roofers',
		industry: 'roofers',
		scriptName: 'Roofing Intake Script',
		description:
			'Capture leak/storm damage details, property location, urgency, roof type, and inspection needs.',
		prompt: `You are a friendly, concise AI receptionist for a roofing company.

Your job is to answer when the business is unavailable, collect the caller's roofing issue, and send a clear lead summary to the team.

Ask one question at a time. Capture:
- caller name
- callback phone number
- roofing issue
- job location
- whether there is an active leak
- whether there was recent storm damage
- roof type if known
- urgency
- best callback time

Do not quote exact prices.
Do not promise availability.
Do not inspect or diagnose beyond basic intake.
Do not claim to be human.
Do not book the job.
End by confirming that the team will follow up as soon as possible.`,
		requiredFields: [
			'caller_name',
			'caller_phone',
			'service_needed',
			'urgency',
			'job_location',
			'active_leak',
			'storm_damage',
			'roof_type',
			'best_callback_time',
		],
		customQuestions: [
			'What roofing issue are you calling about?',
			'Is there an active leak right now?',
			'Was there recent storm or wind damage?',
			'Do you know what type of roof you have?',
			'What city or address is the property located in?',
			'How urgent is this?',
			'What is the best callback number?',
		],
	},
];

export function getDefaultIntakeTemplate() {
	return intakeTemplates[0];
}

export function getIntakeTemplateByIndustry(industry?: string | null) {
	const normalizedIndustry = industry?.toLowerCase().trim();

	return (
		intakeTemplates.find(
			template => template.industry === normalizedIndustry,
		) ?? getDefaultIntakeTemplate()
	);
}
