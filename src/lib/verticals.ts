export const VALID_VERTICALS = [
	'garage-door',
	'self-storage',
	'septic-drain',
	'auto-repair',
] as const;

export type Vertical = (typeof VALID_VERTICALS)[number];

export function normalizeVertical(value: string | null | undefined): Vertical {
	if (VALID_VERTICALS.includes(value as Vertical)) {
		return value as Vertical;
	}

	return 'garage-door';
}

export function getDefaultGreeting(vertical: Vertical, businessName: string) {
	const greetings: Record<Vertical, string> = {
		'garage-door': `Thanks for calling ${businessName}. I can help get your garage door request routed. Is your door stuck open, stuck closed, or is the opener not working?`,
		'self-storage': `Thanks for calling ${businessName}. I can help with storage availability, unit sizes, pricing, gate hours, or move-in questions. What are you looking to store?`,
		'septic-drain': `Thanks for calling ${businessName}. I can help get your septic or drain issue routed. Are you dealing with a clog, sewage backup, septic alarm, or standing water?`,
		'auto-repair': `Thanks for calling ${businessName}. I can help get your service request routed. What vehicle do you have, and are you looking for brakes, tires, maintenance, or a repair?`,
	};

	return greetings[vertical];
}

export function getVerticalLabel(vertical: Vertical) {
	const labels: Record<Vertical, string> = {
		'garage-door': 'Garage Door',
		'self-storage': 'Self Storage',
		'septic-drain': 'Septic & Drain',
		'auto-repair': 'Auto Repair',
	};

	return labels[vertical];
}
