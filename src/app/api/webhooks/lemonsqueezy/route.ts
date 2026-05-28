// src/app/api/webhooks/lemonsqueezy/route.ts
import crypto from 'node:crypto';
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

function verifySignature(rawBody: string, signature: string | null) {
	const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

	if (!secret || !signature) {
		return false;
	}

	const hmac = crypto.createHmac('sha256', secret);
	const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
	const received = Buffer.from(signature, 'utf8');

	if (digest.length !== received.length) {
		return false;
	}

	return crypto.timingSafeEqual(digest, received);
}

export async function POST(request: Request) {
	const rawBody = await request.text();
	const signature = request.headers.get('x-signature');

	if (!verifySignature(rawBody, signature)) {
		return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
	}

	const payload = JSON.parse(rawBody);

	const eventName = payload?.meta?.event_name;
	const custom = payload?.meta?.custom_data ?? {};

	const attributes = payload?.data?.attributes ?? {};
	const subscriptionId = String(payload?.data?.id ?? '');
	const businessId = custom.business_id;

	if (!businessId) {
		return NextResponse.json(
			{ error: 'Missing business_id in custom data' },
			{ status: 400 },
		);
	}

	const supabase = getServiceSupabase();

	if (
		eventName === 'subscription_created' ||
		eventName === 'subscription_updated' ||
		eventName === 'subscription_resumed' ||
		eventName === 'subscription_unpaused' ||
		eventName === 'subscription_payment_success'
	) {
		const customerId = attributes.customer_id
			? String(attributes.customer_id)
			: null;

		const orderId = attributes.order_id ? String(attributes.order_id) : null;
		const variantId = attributes.variant_id
			? String(attributes.variant_id)
			: null;

		const planName =
			attributes.product_name ||
			attributes.variant_name ||
			custom.plan_key ||
			null;

		const status = attributes.status ?? null;

		const renewsAt = attributes.renews_at ?? null;
		const endsAt = attributes.ends_at ?? null;
		const trialEndsAt = attributes.trial_ends_at ?? null;

		const { error } = await supabase.from('subscriptions').upsert(
			{
				business_id: businessId,
				lemon_squeezy_customer_id: customerId,
				lemon_squeezy_subscription_id: subscriptionId,
				lemon_squeezy_order_id: orderId,
				plan_name: planName,
				variant_id: variantId,
				status,
				renews_at: renewsAt,
				ends_at: endsAt,
				trial_ends_at: trialEndsAt,
				updated_at: new Date().toISOString(),
			},
			{
				onConflict: 'lemon_squeezy_subscription_id',
			},
		);

		if (error) {
			return NextResponse.json(
				{ error: 'Failed to sync subscription', details: error.message },
				{ status: 500 },
			);
		}
	}

	if (
		eventName === 'subscription_cancelled' ||
		eventName === 'subscription_expired' ||
		eventName === 'subscription_paused'
	) {
		const { error } = await supabase
			.from('subscriptions')
			.update({
				status: attributes.status ?? eventName.replace('subscription_', ''),
				ends_at: attributes.ends_at ?? null,
				updated_at: new Date().toISOString(),
			})
			.eq('lemon_squeezy_subscription_id', subscriptionId);

		if (error) {
			return NextResponse.json(
				{ error: 'Failed to update subscription', details: error.message },
				{ status: 500 },
			);
		}
	}

	return NextResponse.json({ ok: true });
}
