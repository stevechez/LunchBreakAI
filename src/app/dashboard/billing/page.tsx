// src/app/dashboard/billing/page.tsx
import { createClient } from '@/lib/supabase/server';
import { billingPlans } from '@/lib/billing/plans';
import { CheckoutButton } from './checkout-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

type BillingPageProps = {
	searchParams: Promise<{
		checkout?: string;
	}>;
};

async function getBusinessId() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	const { data: membership } = await supabase
		.from('business_members')
		.select('business_id')
		.eq('user_id', user.id)
		.limit(1)
		.maybeSingle();

	return membership?.business_id ?? null;
}

export default async function BillingPage({ searchParams }: BillingPageProps) {
	const params = await searchParams;
	const supabase = await createClient();
	const businessId = await getBusinessId();

	const { data: subscription } = await supabase
		.from('subscriptions')
		.select('plan_name, status, renews_at, ends_at')
		.eq('business_id', businessId)
		.order('created_at', { ascending: false })
		.limit(1)
		.maybeSingle();

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-slate-950">
					Billing
				</h1>
				<p className="mt-2 text-slate-600">
					Choose a LunchBreak AI plan and manage subscription status.
				</p>
			</div>

			{params.checkout === 'success' ? (
				<div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
					Checkout completed. Your subscription is active.
				</div>
			) : null}

			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Current subscription</CardTitle>
				</CardHeader>
				<CardContent>
					{subscription ? (
						<div className="grid gap-4 md:grid-cols-3">
							<Info label="Plan" value={subscription.plan_name} />
							<Info label="Status" value={subscription.status} />
							<Info
								label="Renews"
								value={
									subscription.renews_at
										? new Date(subscription.renews_at).toLocaleDateString()
										: 'Not set'
								}
							/>
						</div>
					) : (
						<p className="text-slate-500">
							No active subscription yet. Choose a plan below.
						</p>
					)}
				</CardContent>
			</Card>

			<div className="grid gap-6 lg:grid-cols-3">
				{Object.values(billingPlans).map(plan => (
					<Card
						key={plan.key}
						className={plan.key === 'pro' ? 'border-blue-300' : ''}
					>
						<CardHeader>
							<CardTitle>{plan.name}</CardTitle>
							<p className="text-3xl font-bold text-slate-950">{plan.price}</p>
							<p className="text-sm text-slate-500">{plan.description}</p>
						</CardHeader>

						<CardContent>
							<CheckoutButton planKey={plan.key}>
								Choose {plan.name}
							</CheckoutButton>

							<ul className="mt-6 space-y-3 text-sm text-slate-600">
								{plan.features.map(feature => (
									<li key={feature} className="flex gap-2">
										<CheckCircle2 className="h-5 w-5 flex-none text-emerald-500" />
										<span>{feature}</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

function Info({ label, value }: { label: string; value?: string | null }) {
	return (
		<div>
			<p className="text-sm font-medium text-slate-500">{label}</p>
			<p className="mt-1 font-semibold text-slate-950">{value || 'Not set'}</p>
		</div>
	);
}
