// src/app/dashboard/page.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { SetupChecklist } from '@/components/dashboard/setup-checklist';
import { AiGuardrailsCard } from '@/components/dashboard/ai-guardrails-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, DollarSign, PhoneCall, Target, Timer } from 'lucide-react';

async function getCurrentBusiness() {
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

	if (!membership) return null;

	const { data: business } = await supabase
		.from('businesses')
		.select(
			'id, name, industry, business_phone, notification_email, notification_phone',
		)
		.eq('id', membership.business_id)
		.single();

	return business;
}

export default async function DashboardPage() {
	const supabase = await createClient();
	const business = await getCurrentBusiness();

	const businessId = business?.id ?? null;

	const [
		{ count: leadCount },
		{ count: callCount },
		{ data: recentLeads },
		{ data: settings },
		{ data: intakeScript },
		{ data: subscription },
		{ data: testLead },
		{ data: bookedLeads },
	] = await Promise.all([
		supabase
			.from('leads')
			.select('*', { count: 'exact', head: true })
			.eq('business_id', businessId),

		supabase
			.from('calls')
			.select('*', { count: 'exact', head: true })
			.eq('business_id', businessId),

		supabase
			.from('leads')
			.select(
				'id, caller_name, caller_phone, service_needed, status, urgency, estimated_value, created_at',
			)
			.eq('business_id', businessId)
			.order('created_at', { ascending: false })
			.limit(5),

		supabase
			.from('receptionist_settings')
			.select('assigned_phone_number, greeting')
			.eq('business_id', businessId)
			.maybeSingle(),

		supabase
			.from('intake_scripts')
			.select('id')
			.eq('business_id', businessId)
			.eq('is_active', true)
			.limit(1)
			.maybeSingle(),

		supabase
			.from('subscriptions')
			.select('id, status')
			.eq('business_id', businessId)
			.in('status', ['active', 'on_trial'])
			.limit(1)
			.maybeSingle(),

		supabase
			.from('leads')
			.select('id')
			.eq('business_id', businessId)
			.limit(1)
			.maybeSingle(),

		supabase
			.from('leads')
			.select('booked_value, estimated_value')
			.eq('business_id', businessId)
			.eq('status', 'booked'),
	]);

	const estimatedPipeline =
		recentLeads?.reduce((sum, lead) => {
			return sum + Number(lead.estimated_value ?? 0);
		}, 0) ?? 0;

	const bookedRevenue =
		bookedLeads?.reduce((sum, lead) => {
			return (
				sum +
				Number(lead.booked_value ?? 0) +
				(!lead.booked_value ? Number(lead.estimated_value ?? 0) : 0)
			);
		}, 0) ?? 0;

	const needsFollowUp =
		recentLeads?.filter(lead => lead.status === 'new').length ?? 0;

	const hasBusinessProfile = Boolean(business?.name);
	const hasNotificationEmail = Boolean(business?.notification_email);
	const hasNotificationPhone = Boolean(business?.notification_phone);
	const hasIntakeScript = Boolean(intakeScript);
	const hasAssignedPhoneNumber = Boolean(settings?.assigned_phone_number);
	const hasSubscription = Boolean(subscription);
	const hasTestLead = Boolean(testLead);

	return (
		<div className="space-y-8">
			<div>
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
					Revenue recovery
				</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
					Missed-call recovery dashboard
				</h1>
				<p className="mt-2 max-w-3xl text-slate-600">
					LunchBreak AI protects your business from ready-to-buy callers hitting
					voicemail, full mailboxes, or no answer.
				</p>
			</div>

			<SetupChecklist
				hasBusinessProfile={hasBusinessProfile}
				hasNotificationEmail={hasNotificationEmail}
				hasNotificationPhone={hasNotificationPhone}
				hasIntakeScript={hasIntakeScript}
				hasAssignedPhoneNumber={hasAssignedPhoneNumber}
				hasSubscription={hasSubscription}
				hasTestLead={hasTestLead}
			/>

			<div className="grid gap-6 md:grid-cols-4">
				<MetricCard
					title="Recovered leads"
					value={leadCount ?? 0}
					description="Captured instead of lost"
					icon={<Target className="h-5 w-5" />}
				/>

				<MetricCard
					title="Calls answered"
					value={callCount ?? 0}
					description="Handled by LunchBreak AI"
					icon={<PhoneCall className="h-5 w-5" />}
				/>

				<MetricCard
					title="Estimated pipeline"
					value={`$${estimatedPipeline.toLocaleString()}`}
					description="Recent lead value"
					icon={<DollarSign className="h-5 w-5" />}
				/>

				<MetricCard
					title="Needs follow-up"
					value={needsFollowUp}
					description="New leads waiting"
					icon={<Timer className="h-5 w-5" />}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader>
						<div className="flex items-center justify-between gap-4">
							<div>
								<CardTitle>Recent recovered leads</CardTitle>
								<p className="mt-2 text-sm text-slate-600">
									Every row is a caller who did not hit a dead end.
								</p>
							</div>

							<Link
								href="/dashboard/leads"
								className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
							>
								View all
								<ArrowRight className="ml-1 h-4 w-4" />
							</Link>
						</div>
					</CardHeader>

					<CardContent>
						{!recentLeads?.length ? (
							<div className="rounded-2xl border border-dashed p-8 text-center">
								<p className="font-medium text-slate-950">
									No leads yet — try a demo call
								</p>
								<p className="mt-2 text-sm text-slate-500">
									Simulate a missed call to see exactly how the workflow works.
								</p>
								<Link
									href="/dashboard/leads"
									className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
								>
									<PhoneCall className="h-4 w-4" />
									Simulate a missed call
								</Link>
							</div>
						) : (
							<div className="divide-y rounded-2xl border">
								{recentLeads.map(lead => (
									<Link
										key={lead.id}
										href={`/dashboard/leads/${lead.id}`}
										className="flex items-center justify-between gap-4 p-4 hover:bg-slate-50"
									>
										<div>
											<p className="font-medium text-slate-950">
												{lead.caller_name || 'Unknown caller'}
											</p>
											<p className="mt-1 text-sm text-slate-500">
												{lead.service_needed || 'Service request'} ·{' '}
												{lead.caller_phone || 'No phone'}
											</p>
										</div>

										<div className="text-right">
											<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
												{lead.status}
											</span>
											<p className="mt-2 text-xs text-slate-500">
												{lead.estimated_value
													? `$${Number(lead.estimated_value).toLocaleString()}`
													: 'Value not set'}
											</p>
										</div>
									</Link>
								))}
							</div>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Mode</CardTitle>
						<p className="mt-2 text-sm text-slate-600">
							Keep this in test mode until you trust the call flow.
						</p>
					</CardHeader>

					<CardContent>
						<div
							className={
								hasAssignedPhoneNumber
									? 'rounded-2xl border border-emerald-200 bg-emerald-50 p-5'
									: 'rounded-2xl border border-amber-200 bg-amber-50 p-5'
							}
						>
							<p
								className={
									hasAssignedPhoneNumber
										? 'text-sm font-semibold uppercase tracking-wide text-emerald-700'
										: 'text-sm font-semibold uppercase tracking-wide text-amber-700'
								}
							>
								{hasAssignedPhoneNumber ? 'Phone connected' : 'Test mode'}
							</p>

							<p className="mt-2 text-sm text-slate-700">
								{hasAssignedPhoneNumber
									? `Your assigned number is ${settings?.assigned_phone_number}.`
									: 'Your AI receptionist is not live for callers yet.'}
							</p>
						</div>

						<div className="mt-5 space-y-3 text-sm text-slate-600">
							<p>
								<strong>Next:</strong> Go to Leads and simulate a missed call to
								see the full workflow.
							</p>
							<Link
								href="/dashboard/leads"
								className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
							>
								<PhoneCall className="h-4 w-4" />
								Simulate a missed call
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>

			<AiGuardrailsCard />

			<Card>
				<CardHeader>
					<CardTitle>Revenue proof</CardTitle>
					<p className="mt-2 text-sm text-slate-600">
						This is the story you want every business owner to understand.
					</p>
				</CardHeader>

				<CardContent>
					<div className="rounded-2xl bg-slate-950 p-6 text-white">
						<p className="text-lg font-semibold">
							One missed call can be one missed job.
						</p>
						<p className="mt-3 max-w-3xl leading-7 text-slate-300">
							LunchBreak AI catches those calls, captures the job details, and
							alerts your team while the customer is still ready to buy.
						</p>

						<div className="mt-6 grid gap-4 md:grid-cols-3">
							<ProofMetric
								label="Booked revenue"
								value={`$${bookedRevenue.toLocaleString()}`}
							/>
							<ProofMetric label="Recovered leads" value={leadCount ?? 0} />
							<ProofMetric label="New follow-ups" value={needsFollowUp} />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function MetricCard({
	title,
	value,
	description,
	icon,
}: {
	title: string;
	value: string | number;
	description: string;
	icon: React.ReactNode;
}) {
	return (
		<Card>
			<CardHeader className="pb-3">
				<div className="flex items-center justify-between">
					<CardTitle className="text-sm font-medium text-slate-500">
						{title}
					</CardTitle>
					<div className="rounded-xl bg-blue-50 p-2 text-blue-600">{icon}</div>
				</div>
			</CardHeader>

			<CardContent>
				<p className="text-3xl font-bold text-slate-950">{value}</p>
				<p className="mt-1 text-sm text-slate-500">{description}</p>
			</CardContent>
		</Card>
	);
}

function ProofMetric({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<div className="rounded-2xl bg-white/10 p-4">
			<p className="text-sm text-slate-300">{label}</p>
			<p className="mt-1 text-2xl font-bold text-white">{value}</p>
		</div>
	);
}
