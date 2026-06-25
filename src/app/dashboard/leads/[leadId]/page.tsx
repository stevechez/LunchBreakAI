// src/app/dashboard/leads/[leadId]/page.tsx
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import {
	ArrowLeft,
	CalendarDays,
	DollarSign,
	Mail,
	MapPin,
	Phone,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { updateLeadOutcomeAction, updateLeadStatusAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LeadDetailPageProps = {
	params: Promise<{
		leadId: string;
	}>;
	searchParams: Promise<{
		error?: string;
		saved?: string;
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

function formatMoney(value?: number | null) {
	if (!value) return 'Not set';

	return `$${Number(value).toLocaleString()}`;
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
	const isBooked = lead.status === 'booked';
	const displayRevenue = lead.booked_value || lead.estimated_value || null;

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
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
							Recovered missed-call lead
						</p>

						<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
							{lead.caller_name || 'Unknown caller'}
						</h1>

						<p className="mt-2 text-slate-600">
							{lead.service_needed || 'No service specified'}
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white">
							{lead.status}
						</div>

						{displayRevenue ? (
							<div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
								{formatMoney(displayRevenue)}
							</div>
						) : null}
					</div>
				</div>
			</div>

			{query.error ? (
				<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{query.error}
				</div>
			) : null}

			{query.saved ? (
				<div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
					Lead outcome saved.
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
							<CardTitle>Voicemail recording</CardTitle>
						</CardHeader>
						<CardContent>
							{primaryCall?.recording_url ? (
								<div className="space-y-3">
									<audio
										controls
										className="w-full rounded-xl"
										src={`/api/recording?url=${encodeURIComponent(primaryCall.recording_url)}`}
									>
										Your browser does not support audio playback.
									</audio>
									{primaryCall.transcript ? (
										<pre className="whitespace-pre-wrap rounded-xl bg-slate-950 p-5 text-sm leading-7 text-slate-100">
											{primaryCall.transcript}
										</pre>
									) : (
										<p className="text-sm text-slate-500">
											Transcript not available. Use the player above to hear the
											message.
										</p>
									)}
								</div>
							) : (
								<p className="text-slate-500">No voicemail recorded.</p>
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

					<Card className="border-amber-100 bg-amber-50/40">
						<CardHeader>
							<div className="flex items-start gap-3">
								<div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
									<Phone className="h-5 w-5" />
								</div>
								<div>
									<CardTitle>Recommended follow-up</CardTitle>
									<p className="mt-2 text-sm text-slate-600">
										Use this script when you call this lead back.
									</p>
								</div>
							</div>
						</CardHeader>

						<CardContent className="space-y-4">
							<div className="rounded-xl border border-amber-200 bg-white p-4">
								<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
									Call opener
								</p>
								<p className="leading-7 text-slate-800">
									{`"Hi, this is the team returning your call. I saw you reached
  out earlier — are you still looking for help? I want to make
  sure we don't leave you without an answer."`}
								</p>
							</div>

							<div className="rounded-xl border border-amber-200 bg-white p-4">
								<p className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
									Text message
								</p>
								<p className="leading-7 text-slate-800">
									{`"Hi, you called us earlier and we missed you — so sorry about
									that. We'd love to help. Can we set up a quick call?"`}
								</p>
							</div>

							<div className="flex gap-3">
								{lead.caller_phone ? (
									<a
										href={`tel:${lead.caller_phone}`}
										className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
									>
										<Phone className="h-4 w-4" />
										Call now
									</a>
								) : null}

								{lead.caller_phone ? (
									<a
										href={`sms:${lead.caller_phone}`}
										className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:bg-slate-50"
									>
										Text now
									</a>
								) : null}
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="space-y-6">
					<Card
						className={
							isBooked
								? 'border-emerald-200 bg-emerald-50/40'
								: 'border-blue-100 bg-blue-50/30'
						}
					>
						<CardHeader>
							<div className="flex items-start gap-3">
								<div
									className={
										isBooked
											? 'rounded-2xl bg-emerald-100 p-3 text-emerald-700'
											: 'rounded-2xl bg-blue-100 p-3 text-blue-700'
									}
								>
									<DollarSign className="h-5 w-5" />
								</div>

								<div>
									<CardTitle>Lead outcome</CardTitle>
									<p className="mt-2 text-sm text-slate-600">
										Track whether this recovered call became real revenue.
									</p>
								</div>
							</div>
						</CardHeader>

						<CardContent>
							<form action={updateLeadOutcomeAction} className="space-y-5">
								<input type="hidden" name="lead_id" value={lead.id} />

								<div className="space-y-2">
									<Label htmlFor="status">Status</Label>
									<select
										id="status"
										name="status"
										defaultValue={lead.status}
										className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm"
									>
										<option value="new">New</option>
										<option value="contacted">Contacted</option>
										<option value="booked">Booked</option>
										<option value="lost">Lost</option>
										<option value="spam">Spam</option>
									</select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="estimated_value">Estimated value</Label>
									<Input
										id="estimated_value"
										name="estimated_value"
										inputMode="decimal"
										placeholder="950"
										defaultValue={lead.estimated_value ?? ''}
									/>
									<p className="text-xs text-slate-500">
										Expected job value before the lead is confirmed.
									</p>
								</div>

								<div className="space-y-2">
									<Label htmlFor="booked_value">Booked value</Label>
									<Input
										id="booked_value"
										name="booked_value"
										inputMode="decimal"
										placeholder="1200"
										defaultValue={lead.booked_value ?? ''}
									/>
									<p className="text-xs text-slate-500">
										Actual value once the job is booked. Used for ROI reporting.
									</p>
								</div>

								<Button className="w-full rounded-xl">Save lead outcome</Button>
							</form>

							<div className="mt-5 rounded-2xl border bg-white p-4">
								<p className="text-sm font-medium text-slate-950">
									Revenue attribution
								</p>
								<p className="mt-2 text-sm text-slate-600">
									{isBooked
										? `This recovered lead is counted toward booked revenue at ${formatMoney(
												lead.booked_value || lead.estimated_value,
											)}.`
										: 'Mark this lead as booked when it becomes a real job.'}
								</p>
							</div>
						</CardContent>
					</Card>

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
									{formatMoney(lead.estimated_value)}
								</p>
							</div>

							<div>
								<p className="font-medium text-slate-500">Booked value</p>
								<p className="mt-1 text-slate-950">
									{formatMoney(lead.booked_value)}
								</p>
							</div>

							<div>
								<p className="font-medium text-slate-500">Source</p>
								<p className="mt-1 text-slate-950">
									{lead.source || 'Not set'}
								</p>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Quick status</CardTitle>
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
												className="rounded-xl capitalize"
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
