// src/app/dashboard/leads/[leadId]/page.tsx
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { updateLeadStatusAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LeadDetailPageProps = {
	params: Promise<{
		leadId: string;
	}>;
	searchParams: Promise<{
		error?: string;
	}>;
};

async function getCurrentBusinessId() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const { data: membership } = await supabase
		.from('business_members')
		.select('business_id')
		.eq('user_id', user.id)
		.limit(1)
		.maybeSingle();

	if (!membership) {
		redirect('/onboarding');
	}

	return membership.business_id;
}

export default async function LeadDetailPage({
	params,
	searchParams,
}: LeadDetailPageProps) {
	const { leadId } = await params;
	const query = await searchParams;

	const supabase = await createClient();
	const businessId = await getCurrentBusinessId();

	const { data: lead, error: leadError } = await supabase
		.from('leads')
		.select(
			`
      id,
      caller_name,
      caller_phone,
      caller_email,
      service_needed,
      job_date,
      job_location,
      destination_location,
      summary,
      urgency,
      status,
      estimated_value,
      booked_value,
      source,
      created_at,
      calls (
        id,
        provider,
        status,
        duration_seconds,
        transcript,
        ai_summary,
        recording_url,
        started_at,
        ended_at,
        created_at
      )
    `,
		)
		.eq('id', leadId)
		.eq('business_id', businessId)
		.maybeSingle();

	if (leadError) {
		return (
			<div>
				<h1 className="text-2xl font-bold text-red-700">Lead query error</h1>
				<pre className="mt-4 whitespace-pre-wrap rounded-xl bg-red-50 p-4 text-sm text-red-700">
					{leadError.message}
				</pre>
			</div>
		);
	}

	if (!lead) {
		notFound();
	}

	const primaryCall = lead.calls?.[0];

	return (
		<div>
			<div className="mb-8">
				<Link
					href="/dashboard/leads"
					className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-950"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to leads
				</Link>

				<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
					<div>
						<h1 className="text-3xl font-bold tracking-tight text-slate-950">
							{lead.caller_name || 'Unknown caller'}
						</h1>
						<p className="mt-2 text-slate-600">
							{lead.service_needed || 'No service specified'}
						</p>
					</div>

					<div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">
						{lead.status}
					</div>
				</div>
			</div>

			{query.error ? (
				<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{query.error}
				</div>
			) : null}

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-2">
					<Card>
						<CardHeader>
							<CardTitle>Lead summary</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="leading-7 text-slate-700">
								{lead.summary || 'No summary yet.'}
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Call transcript</CardTitle>
						</CardHeader>
						<CardContent>
							{primaryCall?.transcript ? (
								<pre className="whitespace-pre-wrap rounded-xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
									{primaryCall.transcript}
								</pre>
							) : (
								<p className="text-slate-500">No transcript available.</p>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>AI call summary</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="leading-7 text-slate-700">
								{primaryCall?.ai_summary || 'No call summary available.'}
							</p>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Caller details</CardTitle>
						</CardHeader>

						<CardContent className="space-y-4 text-sm">
							<Info
								icon={<Phone className="h-4 w-4" />}
								label="Phone"
								value={lead.caller_phone}
							/>
							<Info
								icon={<Mail className="h-4 w-4" />}
								label="Email"
								value={lead.caller_email}
							/>
							<Info
								icon={<MapPin className="h-4 w-4" />}
								label="Job location"
								value={lead.job_location}
							/>
							<Info
								icon={<MapPin className="h-4 w-4" />}
								label="Destination"
								value={lead.destination_location}
							/>
							<Info
								icon={<CalendarDays className="h-4 w-4" />}
								label="Job date"
								value={lead.job_date}
							/>

							<div>
								<p className="font-medium text-slate-500">Urgency</p>
								<p className="mt-1 text-slate-950">{lead.urgency}</p>
							</div>

							<div>
								<p className="font-medium text-slate-500">Estimated value</p>
								<p className="mt-1 text-slate-950">
									{lead.estimated_value
										? `$${lead.estimated_value}`
										: 'Not set'}
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Update status</CardTitle>
						</CardHeader>

						<CardContent>
							<form action={updateLeadStatusAction} className="space-y-4">
								<input type="hidden" name="lead_id" value={lead.id} />

								<div className="grid grid-cols-2 gap-3">
									{['new', 'contacted', 'booked', 'lost', 'spam'].map(
										status => (
											<Button
												key={status}
												name="status"
												value={status}
												variant={lead.status === status ? 'default' : 'outline'}
												className="rounded-xl"
											>
												{status}
											</Button>
										),
									)}
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

function Info({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value?: string | null;
}) {
	return (
		<div className="flex gap-3">
			<div className="mt-1 text-slate-400">{icon}</div>
			<div>
				<p className="font-medium text-slate-500">{label}</p>
				<p className="mt-1 text-slate-950">{value || 'Not set'}</p>
			</div>
		</div>
	);
}
