// src/lib/billing/plans.ts

export type BillingPlanKey = 'starter' | 'pro' | 'growth';

export const billingPlans = {
	starter: {
		key: 'starter',
		name: 'Starter',
		price: '$99/mo',
		description: 'Missed-call capture for solo operators.',
		variantId: process.env.LEMONSQUEEZY_STARTER_VARIANT_ID,
		features: [
			'AI answers missed calls',
			'Lead capture',
			'SMS/email summary',
			'Basic dashboard',
		],
	},
	pro: {
		key: 'pro',
		name: 'Pro',
		price: '$199/mo',
		description: 'Best for local service businesses.',
		variantId: process.env.LEMONSQUEEZY_PRO_VARIANT_ID,
		features: [
			'Everything in Starter',
			'After-hours answering',
			'Industry intake script',
			'Lead status tracking',
		],
	},
	growth: {
		key: 'growth',
		name: 'Growth',
		price: '$399/mo',
		description: 'For teams that want a serious AI front desk.',
		variantId: process.env.LEMONSQUEEZY_GROWTH_VARIANT_ID,
		features: [
			'Everything in Pro',
			'Multiple scripts',
			'Priority setup',
			'CRM/Zapier-ready handoff',
		],
	},
} satisfies Record<
	BillingPlanKey,
	{
		key: BillingPlanKey;
		name: string;
		price: string;
		description: string;
		variantId?: string;
		features: string[];
	}
>;

export function getBillingPlan(planKey: string) {
	if (planKey in billingPlans) {
		return billingPlans[planKey as BillingPlanKey];
	}

	return null;
}
