'use client';

import { motion } from 'framer-motion';
import {
	PhoneCall,
	Clock,
	MessageSquareText,
	DollarSign,
	CheckCircle2,
	ArrowRight,
	ShieldCheck,
	Zap,
	Mail,
	Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/Footer';

const pricing = [
	{
		name: 'Starter',
		price: '$99',
		description:
			'For small local businesses that just need missed calls captured.',
		features: [
			'AI answers missed calls',
			'Captures name, phone, and job details',
			'Instant SMS/email lead alert',
			'Customer confirmation text',
			'Basic call transcript',
		],
		cta: 'Start saving calls',
		popular: false,
	},
	{
		name: 'Pro',
		price: '$199',
		description:
			'For service businesses that want better lead qualification and faster follow-up.',
		features: [
			'Everything in Starter',
			'Industry-specific intake scripts',
			'Urgency and job value tagging',
			'Daily lead summary',
			'After-hours call handling',
			'Basic dashboard export',
		],
		cta: 'Get Pro',
		popular: true,
	},
	{
		name: 'Growth',
		price: '$399',
		description:
			'For teams that want a serious front desk without hiring a receptionist.',
		features: [
			'Everything in Pro',
			'Appointment request collection',
			'Multiple locations or crews',
			'CRM/Zapier handoff',
			'Custom voice and greeting',
			'Priority setup support',
		],
		cta: 'Talk to us',
		popular: false,
	},
];

const verticals = [
	'Movers',
	'Plumbers',
	'HVAC',
	'Roofers',
	'Electricians',
	'Dentists',
	'Med spas',
	'Law firms',
];

const intakeSteps = [
	{
		icon: PhoneCall,
		title: 'A customer calls',
		text: 'Your team is busy, on another job, at lunch, or closed for the day.',
	},
	{
		icon: MessageSquareText,
		title: 'AI answers naturally',
		text: 'It greets the caller, captures the right details, and keeps the lead engaged.',
	},
	{
		icon: Zap,
		title: 'You get the lead instantly',
		text: 'A clean summary lands by SMS or email so you can follow up fast.',
	},
];

export default function LunchBreakReceptionistLandingPage() {
	return (
		<main className="min-h-screen bg-slate-950 text-white">
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.35),transparent_35%),radial-gradient(circle_at_top_right,rgba(14,165,233,0.22),transparent_35%)]" />
				<div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-8">
					<nav className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/30">
								<PhoneCall className="h-5 w-5" />
							</div>
							<span className="text-lg font-semibold tracking-tight">
								Lunch Break AI
							</span>
						</div>
						<div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
							<a href="#how" className="hover:text-white">
								How it works
							</a>
							<a href="#pricing" className="hover:text-white">
								Pricing
							</a>
							<a href="#faq" className="hover:text-white">
								FAQ
							</a>
						</div>
						<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
							<Link
								href="/signup"
								className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
							>
								Start free demo
							</Link>

							<Link
								href="/login"
								className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
							>
								Log in
							</Link>
						</div>
					</nav>

					<div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
								<Clock className="h-4 w-4" />
								Never lose a job because nobody picked up.
							</div>
							<h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
								Your AI receptionist for every missed call.
							</h1>
							<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
								Lunch Break AI answers when your business cannot, captures the
								caller’s details, and sends you a clean lead summary instantly.
								One saved job can pay for the entire service.
							</p>
							<div className="mt-8 flex flex-col gap-4 sm:flex-row">
								<Button
									size="lg"
									className="rounded-2xl bg-blue-500 px-7 text-base hover:bg-blue-400"
								>
									Start saving missed calls{' '}
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>
								<Button
									size="lg"
									variant="outline"
									className="rounded-2xl border-slate-600 bg-white/5 px-7 text-base text-white hover:bg-white/10"
								>
									See demo intake
								</Button>
							</div>
							<div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
								{verticals.map(item => (
									<span
										key={item}
										className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
									>
										{item}
									</span>
								))}
							</div>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, scale: 0.97 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, delay: 0.1 }}
							className="relative"
						>
							<Card className="rounded-[2rem] border-white/10 bg-white/10 shadow-2xl shadow-blue-950/50 backdrop-blur">
								<CardContent className="p-6 sm:p-8">
									<div className="mb-6 flex items-center justify-between">
										<div>
											<p className="text-sm text-slate-300">
												Incoming missed-call lead
											</p>
											<h2 className="text-2xl font-semibold text-white">
												Moving quote request
											</h2>
										</div>
										<div className="rounded-2xl bg-emerald-400/20 px-3 py-2 text-sm text-emerald-200">
											Captured
										</div>
									</div>

									<div className="space-y-4 rounded-3xl bg-slate-950/70 p-5">
										<div className="rounded-2xl bg-blue-500/15 p-4">
											<p className="text-sm text-blue-100">AI Receptionist</p>
											<p className="mt-1 text-slate-100">
												“Thanks for calling. I can help get your move request
												started. What date are you looking to move?”
											</p>
										</div>
										<div className="ml-auto rounded-2xl bg-white/10 p-4">
											<p className="text-sm text-slate-300">Caller</p>
											<p className="mt-1 text-slate-100">
												“Next Friday. Two-bedroom apartment from Mountain View
												to San Jose.”
											</p>
										</div>
										<div className="rounded-2xl border border-white/10 bg-white/5 p-4">
											<p className="mb-3 text-sm font-medium text-slate-200">
												Lead summary sent to owner
											</p>
											<ul className="space-y-2 text-sm text-slate-300">
												<li>• Caller: Steve</li>
												<li>• Job: 2-bedroom move</li>
												<li>• Route: Mountain View → San Jose</li>
												<li>• Timing: Next Friday</li>
												<li>• Intent: High — wants quote today</li>
											</ul>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</section>

			<section className="border-y border-white/10 bg-slate-900/70 px-6 py-10">
				<div className="mx-auto grid max-w-7xl gap-6 text-center sm:grid-cols-3">
					<div>
						<p className="text-4xl font-bold">1 call</p>
						<p className="mt-2 text-slate-300">
							can be worth hundreds or thousands
						</p>
					</div>
					<div>
						<p className="text-4xl font-bold">24/7</p>
						<p className="mt-2 text-slate-300">
							coverage without hiring a front desk
						</p>
					</div>
					<div>
						<p className="text-4xl font-bold">60 sec</p>
						<p className="mt-2 text-slate-300">
							from missed call to lead summary
						</p>
					</div>
				</div>
			</section>

			<section id="how" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						How it works
					</p>
					<h2 className="mt-3 text-4xl font-bold tracking-tight">
						A front desk that never lets callers hit a dead end.
					</h2>
					<p className="mt-4 text-lg text-slate-300">
						Forward missed calls, after-hours calls, or all calls during busy
						windows. Lunch Break AI handles the first touch and gets the lead to
						the right person.
					</p>
				</div>
				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{intakeSteps.map(step => (
						<Card
							key={step.title}
							className="rounded-3xl border-white/10 bg-white/5"
						>
							<CardContent className="p-7">
								<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
									<step.icon className="h-6 w-6" />
								</div>
								<h3 className="text-xl font-semibold text-white">
									{step.title}
								</h3>
								<p className="mt-3 leading-7 text-slate-300">{step.text}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="bg-white px-6 py-20 text-slate-950 lg:px-8">
				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
							The pitch
						</p>
						<h2 className="mt-3 text-4xl font-bold tracking-tight">
							You do not need more leads. You need to stop wasting the ones
							already calling.
						</h2>
					</div>
					<div className="space-y-5 text-lg leading-8 text-slate-700">
						<p>
							Customers do not patiently call back. They call the next business.
							Lunch Break AI catches that moment while the buyer is still hot.
						</p>
						<p>
							Instead of a full voicemail box, they get a helpful receptionist.
							Instead of a lost opportunity, you get a qualified lead in your
							pocket.
						</p>
					</div>
				</div>
			</section>

			<section id="pricing" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						Pricing
					</p>
					<h2 className="mt-3 text-4xl font-bold tracking-tight">
						One saved job can pay for the month.
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
						Connect Lemon Squeezy checkout links to these plans and launch with
						simple subscription billing.
					</p>
				</div>
				<div className="mt-12 grid gap-6 lg:grid-cols-3">
					{pricing.map(plan => (
						<Card
							key={plan.name}
							className={`relative rounded-[2rem] ${plan.popular ? 'border-blue-400 bg-blue-500/15' : 'border-white/10 bg-white/5'}`}
						>
							{plan.popular && (
								<div className="absolute right-6 top-6 rounded-full bg-blue-400 px-3 py-1 text-xs font-semibold text-slate-950">
									Most popular
								</div>
							)}
							<CardContent className="p-7">
								<h3 className="text-2xl font-semibold text-white">
									{plan.name}
								</h3>
								<div className="mt-4 flex items-end gap-1">
									<span className="text-5xl font-bold text-white">
										{plan.price}
									</span>
									<span className="pb-2 text-slate-300">/mo</span>
								</div>
								<p className="mt-4 min-h-[72px] text-slate-300">
									{plan.description}
								</p>
								<Button
									className={`mt-6 w-full rounded-2xl ${plan.popular ? 'bg-blue-400 text-slate-950 hover:bg-blue-300' : 'bg-white text-slate-950 hover:bg-slate-200'}`}
								>
									{plan.cta}
								</Button>
								<ul className="mt-6 space-y-3 text-sm text-slate-300">
									{plan.features.map(feature => (
										<li key={feature} className="flex gap-3">
											<CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
				<div className="grid gap-6 md:grid-cols-3">
					<Card className="rounded-3xl border-white/10 bg-white/5">
						<CardContent className="p-7">
							<DollarSign className="mb-5 h-8 w-8 text-blue-300" />
							<h3 className="text-xl font-semibold text-white">ROI-first</h3>
							<p className="mt-3 text-slate-300">
								Show businesses exactly how many calls were saved and how much
								potential revenue was recovered.
							</p>
						</CardContent>
					</Card>
					<Card className="rounded-3xl border-white/10 bg-white/5">
						<CardContent className="p-7">
							<Wrench className="mb-5 h-8 w-8 text-blue-300" />
							<h3 className="text-xl font-semibold text-white">
								Vertical scripts
							</h3>
							<p className="mt-3 text-slate-300">
								Movers, plumbers, roofers, HVAC, and more get the exact
								questions their teams already ask.
							</p>
						</CardContent>
					</Card>
					<Card className="rounded-3xl border-white/10 bg-white/5">
						<CardContent className="p-7">
							<ShieldCheck className="mb-5 h-8 w-8 text-blue-300" />
							<h3 className="text-xl font-semibold text-white">
								No app required
							</h3>
							<p className="mt-3 text-slate-300">
								Start with call forwarding, SMS alerts, and email summaries. Add
								dashboards only when needed.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<section id="faq" className="bg-slate-900 px-6 py-20 lg:px-8">
				<div className="mx-auto max-w-4xl">
					<h2 className="text-4xl font-bold tracking-tight">FAQ</h2>
					<div className="mt-10 space-y-5">
						{[
							[
								'Do I need to replace my phone number?',
								'No. Start by forwarding missed calls or after-hours calls to Lunch Break AI.',
							],
							[
								'Can it work without a dashboard?',
								'Yes. The MVP can run on call forwarding, SMS, email summaries, and Lemon Squeezy billing.',
							],
							[
								'Is this just voicemail?',
								'No. Voicemail makes the customer do the work. Lunch Break AI has a real conversation and captures structured lead details.',
							],
							[
								'What happens after the call?',
								'The business owner gets a concise lead summary and the caller gets a confirmation text.',
							],
						].map(([q, a]) => (
							<div
								key={q}
								className="rounded-3xl border border-white/10 bg-white/5 p-6"
							>
								<h3 className="text-lg font-semibold text-white">{q}</h3>
								<p className="mt-2 leading-7 text-slate-300">{a}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="px-6 py-20 lg:px-8">
				<div className="mx-auto max-w-5xl rounded-[2rem] bg-blue-500 p-8 text-center text-white shadow-2xl shadow-blue-950/40 sm:p-12">
					<Mail className="mx-auto mb-5 h-10 w-10" />
					<h2 className="text-4xl font-bold tracking-tight">
						Stop sending ready-to-buy callers to a dead mailbox.
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50">
						Launch a simple AI receptionist that captures missed calls,
						qualifies leads, and helps local businesses win jobs they were
						already paying to attract.
					</p>
					<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							size="lg"
							className="rounded-2xl bg-white px-7 text-base text-slate-950 hover:bg-blue-50"
						>
							Join the early access list
						</Button>
						<Button
							size="lg"
							variant="outline"
							className="rounded-2xl border-white/40 bg-white/10 px-7 text-base text-white hover:bg-white/20"
						>
							Book a setup call
						</Button>
					</div>
				</div>
			</section>
			<SiteFooter />
		</main>
	);
}
