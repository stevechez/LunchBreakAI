import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Building2, ClipboardList } from 'lucide-react';

type BetaRequest = {
	id: string;
	business_name: string | null;
	contact_name: string | null;
	email: string;
	phone: string | null;
	business_type: string | null;
	missed_call_problem: string | null;
	status: string;
	created_at: string;
};

const allowedStatuses = new Set(['new', 'contacted', 'good_fit', 'not_fit']);

function getServiceSupabase() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !serviceRoleKey) {
		throw new Error('Missing Supabase service role env vars');
	}

	return createServiceClient(supabaseUrl, serviceRoleKey);
}

async function requireUser() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	return user;
}

function formatDate(value: string) {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
	}).format(new Date(value));
}

function getStatusLabel(status: string) {
	switch (status) {
		case 'good_fit':
			return 'Good fit';
		case 'not_fit':
			return 'Not fit';
		default:
			return status;
	}
}

async function updateBetaRequestStatusAction(formData: FormData) {
	'use server';

	await requireUser();

	const requestId = String(formData.get('request_id') ?? '').trim();
	const status = String(formData.get('status') ?? '').trim();

	if (!requestId || !allowedStatuses.has(status)) {
		redirect('/dashboard/beta-requests');
	}

	const supabase = getServiceSupabase();

	const { error } = await supabase
		.from('beta_requests')
		.update({ status })
		.eq('id', requestId);

	if (error) {
		redirect(
			`/dashboard/beta-requests?error=${encodeURIComponent(error.message)}`,
		);
	}

	revalidatePath('/dashboard/beta-requests');
	redirect('/dashboard/beta-requests?saved=1');
}

export default async function BetaRequestsPage({
	searchParams,
}: {
	searchParams: Promise<{
		error?: string;
		saved?: string;
	}>;
}) {
	await requireUser();

	const query = await searchParams;
	const supabase = getServiceSupabase();

	const { data, error } = await supabase
		.from('beta_requests')
		.select(
			'id, business_name, contact_name, email, phone, business_type, missed_call_problem, status, created_at',
		)
		.order('created_at', { ascending: false });

	const betaRequests = (data ?? []) as BetaRequest[];

	return (
		<div>
			<div className="mb-8">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
					Validation inbox
				</p>

				<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
					Beta requests
				</h1>

				<p className="mt-2 max-w-2xl text-slate-600">
					These are businesses that raised their hand for Lunch Break AI. Your
					next job is to contact them, learn about their missed-call problem,
					and see if they are a real fit.
				</p>
			</div>

			{query.error ? (
				<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{query.error}
				</div>
			) : null}

			{query.saved ? (
				<div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
					Beta request updated.
				</div>
			) : null}

			{error ? (
				<Card>
					<CardContent className="p-6">
						<p className="text-sm text-red-600">{error.message}</p>
					</CardContent>
				</Card>
			) : null}

			<div className="mb-6 grid gap-4 md:grid-cols-4">
				<StatCard label="Total requests" value={betaRequests.length} />
				<StatCard
					label="New"
					value={betaRequests.filter(item => item.status === 'new').length}
				/>
				<StatCard
					label="Contacted"
					value={
						betaRequests.filter(item => item.status === 'contacted').length
					}
				/>
				<StatCard
					label="Good fit"
					value={
						betaRequests.filter(item => item.status === 'good_fit').length
					}
				/>
			</div>

			{betaRequests.length === 0 ? (
				<Card className="rounded-3xl">
					<CardContent className="p-8 text-center">
						<ClipboardList className="mx-auto mb-4 h-10 w-10 text-slate-400" />
						<h2 className="text-xl font-semibold text-slate-950">
							No beta requests yet.
						</h2>
						<p className="mx-auto mt-2 max-w-xl text-slate-600">
							Once someone submits the beta request form, they will appear here.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-5">
					{betaRequests.map(request => (
						<Card key={request.id} className="rounded-3xl">
							<CardHeader>
								<div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
									<div>
										<CardTitle>
											{request.business_name || 'Unnamed business'}
										</CardTitle>

										<p className="mt-2 text-sm text-slate-500">
											Submitted {formatDate(request.created_at)}
										</p>
									</div>

									<div className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium capitalize text-white">
										{getStatusLabel(request.status)}
									</div>
								</div>
							</CardHeader>

							<CardContent className="space-y-5">
								<div className="grid gap-4 md:grid-cols-3">
									<InfoBlock
										icon={<Building2 className="h-4 w-4" />}
										label="Business type"
										value={request.business_type}
									/>

									<InfoBlock
										icon={<Mail className="h-4 w-4" />}
										label="Email"
										value={request.email}
									/>

									<InfoBlock
										icon={<Phone className="h-4 w-4" />}
										label="Phone"
										value={request.phone}
									/>
								</div>

								<div className="rounded-2xl border bg-slate-50 p-5">
									<p className="text-sm font-medium text-slate-500">
										Missed-call problem
									</p>
									<p className="mt-2 leading-7 text-slate-800">
										{request.missed_call_problem ||
											'No missed-call details provided.'}
									</p>
								</div>

								<div className="rounded-2xl border bg-white p-5">
									<p className="text-sm font-medium text-slate-950">
										Contact script
									</p>

									<p className="mt-2 leading-7 text-slate-700">
										Hi {request.contact_name || 'there'}, thanks for requesting
										access to Lunch Break AI. I saw that your business may be
										missing calls. I am testing a simple missed-call recovery
										dashboard that helps capture the caller, summarize the need,
										and make follow-up easier. Would you be open to a quick
										10-minute walkthrough?
									</p>
								</div>

								<form
									action={updateBetaRequestStatusAction}
									className="grid gap-3 sm:grid-cols-4"
								>
									<input
										type="hidden"
										name="request_id"
										value={request.id}
									/>

									<Button
										name="status"
										value="new"
										variant={request.status === 'new' ? 'default' : 'outline'}
										className="rounded-xl"
									>
										New
									</Button>

									<Button
										name="status"
										value="contacted"
										variant={
											request.status === 'contacted' ? 'default' : 'outline'
										}
										className="rounded-xl"
									>
										Contacted
									</Button>

									<Button
										name="status"
										value="good_fit"
										variant={
											request.status === 'good_fit' ? 'default' : 'outline'
										}
										className="rounded-xl"
									>
										Good fit
									</Button>

									<Button
										name="status"
										value="not_fit"
										variant={
											request.status === 'not_fit' ? 'default' : 'outline'
										}
										className="rounded-xl"
									>
										Not fit
									</Button>
								</form>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}

function StatCard({ label, value }: { label: string; value: number }) {
	return (
		<Card className="rounded-3xl">
			<CardContent className="p-5">
				<p className="text-sm text-slate-500">{label}</p>
				<p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
			</CardContent>
		</Card>
	);
}

function InfoBlock({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value?: string | null;
}) {
	return (
		<div className="rounded-2xl border bg-white p-4">
			<div className="mb-2 flex items-center gap-2 text-slate-400">
				{icon}
				<p className="text-xs font-semibold uppercase tracking-[0.15em]">
					{label}
				</p>
			</div>

			<p className="break-words text-sm font-medium text-slate-950">
				{value || 'Not set'}
			</p>
		</div>
	);
}
