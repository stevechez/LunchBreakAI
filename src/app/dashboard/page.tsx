// src/app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default async function DashboardPage() {
	const supabase = await createClient();
	const businessId = await getBusinessId();

	const [{ count: leadCount }, { count: callCount }, { data: recentLeads }] =
		await Promise.all([
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
					'id, caller_name, caller_phone, service_needed, status, created_at',
				)
				.eq('business_id', businessId)
				.order('created_at', { ascending: false })
				.limit(5),
		]);

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-slate-950">
					Recovered revenue dashboard
				</h1>
				<p className="mt-2 text-slate-600">
					Track the calls LunchBreak AI saved before they became lost jobs.
				</p>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-slate-500">
							Leads captured
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">{leadCount ?? 0}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-slate-500">
							Calls answered
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">{callCount ?? 0}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-sm font-medium text-slate-500">
							Estimated recovered value
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-4xl font-bold">$0</p>
						<p className="mt-1 text-sm text-slate-500">
							Add booked values soon.
						</p>
					</CardContent>
				</Card>
			</div>

			<Card className="mt-8">
				<CardHeader>
					<CardTitle>Recent leads</CardTitle>
				</CardHeader>
				<CardContent>
					{!recentLeads?.length ? (
						<p className="text-slate-500">
							No leads yet. Once your AI receptionist starts answering calls,
							captured leads will appear here.
						</p>
					) : (
						<div className="divide-y">
							{recentLeads.map(lead => (
								<div
									key={lead.id}
									className="flex items-center justify-between py-4"
								>
									<div>
										<p className="font-medium">
											{lead.caller_name || 'Unknown caller'}
										</p>
										<p className="text-sm text-slate-500">
											{lead.service_needed || 'No service noted'} ·{' '}
											{lead.caller_phone || 'No phone'}
										</p>
									</div>

									<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
										{lead.status}
									</span>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
