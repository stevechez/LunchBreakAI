// src/app/onboarding/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createBusinessAction } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type OnboardingPageProps = {
	searchParams: Promise<{
		error?: string;
	}>;
};

export default async function OnboardingPage({
	searchParams,
}: OnboardingPageProps) {
	const params = await searchParams;
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
		.maybeSingle();

	if (membership) {
		redirect('/dashboard');
	}

	return (
		<main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
			<div className="mx-auto max-w-3xl">
				<div className="mb-8">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						Setup
					</p>
					<h1 className="mt-3 text-4xl font-bold tracking-tight">
						Set up your AI receptionist
					</h1>
					<p className="mt-3 text-slate-300">
						Add the basics now. You can refine the greeting, questions, and call
						handling later.
					</p>
				</div>

				<Card className="border-white/10 bg-white/5 text-white">
					<CardHeader>
						<CardTitle>Business details</CardTitle>
					</CardHeader>

					<CardContent>
						{params.error ? (
							<div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
								{params.error}
							</div>
						) : null}

						<form action={createBusinessAction} className="space-y-6">
							<div className="space-y-2">
								<Label htmlFor="business_name">Business name</Label>
								<Input
									id="business_name"
									name="business_name"
									required
									placeholder="Flash Movers LLC"
									className="bg-white text-slate-950"
								/>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="industry">Industry</Label>
									<Input
										id="industry"
										name="industry"
										placeholder="movers"
										className="bg-white text-slate-950"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="website_url">Website</Label>
									<Input
										id="website_url"
										name="website_url"
										placeholder="https://example.com"
										className="bg-white text-slate-950"
									/>
								</div>
							</div>

							<div className="grid gap-6 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="business_phone">Business phone</Label>
									<Input
										id="business_phone"
										name="business_phone"
										placeholder="+1 650 555 1212"
										className="bg-white text-slate-950"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="notification_phone">Notification phone</Label>
									<Input
										id="notification_phone"
										name="notification_phone"
										placeholder="+1 650 555 1212"
										className="bg-white text-slate-950"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="notification_email">Notification email</Label>
								<Input
									id="notification_email"
									name="notification_email"
									type="email"
									placeholder="owner@example.com"
									className="bg-white text-slate-950"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="service_area">Service area</Label>
								<Input
									id="service_area"
									name="service_area"
									placeholder="Mountain View, Palo Alto, San Jose"
									className="bg-white text-slate-950"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="greeting">AI greeting</Label>
								<Textarea
									id="greeting"
									name="greeting"
									placeholder="Thanks for calling Flash Movers. I can help get your move request started."
									className="min-h-28 bg-white text-slate-950"
								/>
							</div>

							<Button className="rounded-xl">Create dashboard</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
