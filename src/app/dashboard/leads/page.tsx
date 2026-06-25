// src/app/dashboard/leads/page.tsx
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateDemoLeadButton } from './create-demo-lead-button';

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

export default async function LeadsPage() {
	const supabase = await createClient();
	const businessId = await getBusinessId();

	const { data: leads } = await supabase
		.from('leads')
		.select(
			'id, caller_name, caller_phone, service_needed, urgency, status, summary, created_at',
		)
		.eq('business_id', businessId)
		.order('created_at', { ascending: false });

	return (
		<div>
			<div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-slate-950">
						Leads
					</h1>
					<p className="mt-2 text-slate-600">
						Every saved caller becomes a lead record here.
					</p>
				</div>

				<CreateDemoLeadButton />
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Captured leads</CardTitle>
				</CardHeader>

				<CardContent>
					{!leads?.length ? (
						<p className="text-slate-500">No leads captured yet.</p>
					) : (
						<div className="overflow-hidden rounded-xl border">
							<table className="w-full text-left text-sm">
								<thead className="bg-slate-50 text-slate-500">
									<tr>
										<th className="px-4 py-3">Caller</th>
										<th className="px-4 py-3">Service</th>
										<th className="px-4 py-3">Urgency</th>
										<th className="px-4 py-3">Status</th>
										<th className="px-4 py-3">Created</th>
									</tr>
								</thead>

								<tbody className="divide-y bg-white">
									{leads.map(lead => (
										<tr key={lead.id} className="hover:bg-slate-50">
											<td className="px-4 py-4">
												<Link
													href={`/dashboard/leads/${lead.id}`}
													className="block"
												>
													<p className="font-medium text-slate-950">
														{lead.caller_name || 'Unknown'}
													</p>
													<p className="text-slate-500">
														{lead.caller_phone || 'No phone'}
													</p>
												</Link>
											</td>

											<td className="px-4 py-4 max-w-xs">
												<Link
													href={`/dashboard/leads/${lead.id}`}
													className="block text-slate-700"
												>
													<p className="truncate">
														{lead.summary ||
															lead.service_needed ||
															'Not specified'}
													</p>
												</Link>
											</td>

											<td className="px-4 py-4">{lead.urgency}</td>
											<td className="px-4 py-4">{lead.status}</td>
											<td className="px-4 py-4 text-slate-500">
												{new Date(lead.created_at).toLocaleDateString()}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
