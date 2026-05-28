// src/app/api/billing/checkout/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getBillingPlan } from '@/lib/billing/plans';

async function getCurrentBusiness() {
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

	const { data: business, error: businessError } = await supabase
		.from('businesses')
		.select('id, name, notification_email')
		.eq('id', membership.business_id)
		.single();

	if (businessError || !business) {
		return { error: 'Business not found' as const };
	}

	return { user, business };
}

export async function POST(request: Request) {
	const body = await request.json().catch(() => null);
	const planKey = String(body?.planKey ?? '');

	const plan = getBillingPlan(planKey);

	if (!plan?.variantId) {
		return NextResponse.json(
			{ error: 'Invalid or unconfigured plan' },
			{ status: 400 },
		);
	}

	const current = await getCurrentBusiness();

	if ('error' in current) {
		return NextResponse.json({ error: current.error }, { status: 401 });
	}

	const apiKey = process.env.LEMONSQUEEZY_API_KEY;
	const storeId = process.env.LEMONSQUEEZY_STORE_ID;
	const appUrl = process.env.NEXT_PUBLIC_APP_URL;

	if (!apiKey || !storeId || !appUrl) {
		return NextResponse.json(
			{ error: 'Missing Lemon Squeezy environment variables' },
			{ status: 500 },
		);
	}

	const checkoutResponse = await fetch(
		'https://api.lemonsqueezy.com/v1/checkouts',
		{
			method: 'POST',
			headers: {
				Accept: 'application/vnd.api+json',
				'Content-Type': 'application/vnd.api+json',
				Authorization: `Bearer ${apiKey}`,
			},
			body: JSON.stringify({
				data: {
					type: 'checkouts',
					attributes: {
						checkout_data: {
							email: current.user.email,
							name: current.business.name,
							custom: {
								business_id: current.business.id,
								user_id: current.user.id,
								plan_key: plan.key,
							},
						},
						product_options: {
							redirect_url: `${appUrl}/dashboard/billing?checkout=success`,
						},
					},
					relationships: {
						store: {
							data: {
								type: 'stores',
								id: storeId,
							},
						},
						variant: {
							data: {
								type: 'variants',
								id: plan.variantId,
							},
						},
					},
				},
			}),
		},
	);

	const checkoutJson = await checkoutResponse.json();

	if (!checkoutResponse.ok) {
		return NextResponse.json(
			{
				error: 'Failed to create checkout',
				details: checkoutJson,
			},
			{ status: 500 },
		);
	}

	const checkoutUrl = checkoutJson?.data?.attributes?.url;

	if (!checkoutUrl) {
		return NextResponse.json(
			{ error: 'Lemon Squeezy did not return a checkout URL' },
			{ status: 500 },
		);
	}

	return NextResponse.json({ url: checkoutUrl });
}
