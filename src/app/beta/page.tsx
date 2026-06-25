'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function BetaRequestPage() {
	const [state, setState] = useState<SubmitState>('idle');
	const [error, setError] = useState('');

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;

		setState('loading');
		setError('');

		const formData = new FormData(form);

		const payload = {
			business_name: String(formData.get('business_name') ?? ''),
			contact_name: String(formData.get('contact_name') ?? ''),
			email: String(formData.get('email') ?? ''),
			phone: String(formData.get('phone') ?? ''),
			business_type: String(formData.get('business_type') ?? ''),
			missed_call_problem: String(formData.get('missed_call_problem') ?? ''),
		};

		try {
			const response = await fetch('/api/beta-request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			const result = await response.json();

			if (!response.ok || !result.ok) {
				setError(result.error || 'Could not submit beta request.');
				setState('error');
				return;
			}

			form.reset();
			setState('success');
		} catch {
			setError('Something went wrong. Please try again.');
			setState('error');
		}
	}

	return (
		<main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
			<div className="mx-auto max-w-3xl">
				<Link
					href="/"
					className="mb-8 inline-flex items-center text-sm text-slate-300 hover:text-white"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Lunch Break AI
				</Link>

				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						Beta request
					</p>

					<h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
						Want Lunch Break AI set up for your business?
					</h1>

					<p className="mt-5 text-lg leading-8 text-slate-300">
						Tell us a little about your business and how missed calls affect
						you. We are looking for a small number of local service businesses
						to test the missed-call recovery workflow.
					</p>
				</div>

				<Card className="rounded-[2rem] border-white/10 bg-white/5">
					<CardContent className="p-6 sm:p-8">
						{state === 'success' ? (
							<div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6">
								<CheckCircle2 className="mb-4 h-8 w-8 text-emerald-300" />
								<h2 className="text-2xl font-semibold text-white">
									Request received.
								</h2>
								<p className="mt-3 leading-7 text-slate-300">
									Thanks. Your beta request was received. You do not need to
									create an account right now. We will review your request and
									follow up if your business is a good fit for the beta.
								</p>

								<div className="mt-6 flex flex-col gap-3 sm:flex-row">
									<Button
										asChild
										className="rounded-xl bg-white text-slate-950 hover:bg-slate-100"
									>
										<Link href="/">Back to homepage</Link>
									</Button>

									<Button
										asChild
										variant="outline"
										className="rounded-xl border-white/20 bg-white/5 text-white hover:bg-white/10"
									>
										<Link href="/signup">Try the demo separately</Link>
									</Button>
								</div>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-5">
								<div className="grid gap-5 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="business_name" className="text-slate-200">
											Business name
										</Label>
										<Input
											id="business_name"
											name="business_name"
											placeholder="Aptos Home Services"
											className="border-white/10 bg-white text-slate-950"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="contact_name" className="text-slate-200">
											Your name
										</Label>
										<Input
											id="contact_name"
											name="contact_name"
											placeholder="Maria"
											className="border-white/10 bg-white text-slate-950"
										/>
									</div>
								</div>

								<div className="grid gap-5 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="email" className="text-slate-200">
											Email
										</Label>
										<Input
											required
											id="email"
											name="email"
											type="email"
											placeholder="you@example.com"
											className="border-white/10 bg-white text-slate-950"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="phone" className="text-slate-200">
											Phone
										</Label>
										<Input
											id="phone"
											name="phone"
											placeholder="831-555-1212"
											className="border-white/10 bg-white text-slate-950"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="business_type" className="text-slate-200">
										What type of business do you run?
									</Label>
									<Input
										id="business_type"
										name="business_type"
										placeholder="Plumbing, HVAC, dental office, med spa, law firm..."
										className="border-white/10 bg-white text-slate-950"
									/>
								</div>

								<div className="space-y-2">
									<Label
										htmlFor="missed_call_problem"
										className="text-slate-200"
									>
										What happens when you miss calls today?
									</Label>
									<textarea
										id="missed_call_problem"
										name="missed_call_problem"
										rows={5}
										placeholder="Example: I miss calls while working with customers, and by the time I call back they already booked someone else."
										className="w-full rounded-xl border border-white/10 bg-white px-3 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400"
									/>
								</div>

								{state === 'error' ? (
									<div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
										{error}
									</div>
								) : null}

								<Button
									type="submit"
									disabled={state === 'loading'}
									className="w-full rounded-xl bg-blue-500 text-base hover:bg-blue-400"
								>
									{state === 'loading' ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Submitting...
										</>
									) : (
										'Request beta access'
									)}
								</Button>

								<p className="text-center text-xs leading-6 text-slate-400">
									No payment required. This just tells us you are interested in
									the beta.
								</p>
							</form>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
