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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SiteFooter } from '@/components/Footer';

const intakeSteps = [
	{
		icon: PhoneCall,
		title: 'A garage door lead calls',
		text: 'Broken spring, stuck door, opener failure, cable off track, or an urgent repair request hits your phone.',
	},
	{
		icon: MessageSquareText,
		title: 'AI responds instantly',
		text: 'The system texts back or answers, asks the garage-door-specific questions, and keeps the customer engaged.',
	},
	{
		icon: Zap,
		title: 'Your team gets the job summary',
		text: 'You receive the caller name, phone, city, issue, urgency, photos, and callback priority by SMS or email.',
	},
];

const garageDoorIssues = [
	'Broken spring',
	'Door stuck closed',
	'Door stuck open',
	'Opener not working',
	'Cable off track',
	'Noisy door',
	'Panel damage',
	'Emergency repair',
];

const betaIncludes = [
	'Missed-call text-back',
	'Garage-door-specific AI intake script',
	'Broken spring / opener / track issue qualification',
	'Customer photo request',
	'Owner SMS and email alerts',
	'Lead dashboard',
	'Basic follow-up sequence',
	'Weekly recovery report',
	'Monthly script tuning',
];

const faqs = [
	[
		'Do I need to replace my phone number?',
		'No. Start by forwarding missed calls, after-hours calls, or busy-line calls to the recovery system.',
	],
	[
		'Is this replacing my office person?',
		'No. It catches the calls your team misses: after-hours, lunch breaks, weekends, busy installs, and double-call moments.',
	],
	[
		'Can it ask garage-door-specific questions?',
		'Yes. The intake is built around spring breaks, stuck doors, openers, tracks, cables, panels, urgency, city, and photos.',
	],
	[
		'What happens after the AI captures the lead?',
		'Your team receives a clean lead summary immediately so you can call back while the customer is still ready to book.',
	],
];

export default function GarageDoorLeadRecoveryPage() {
	const scrollToBeta = () => {
		document.getElementById('beta')?.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToDemo = () => {
		document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
	};

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
							<div>
								<span className="block text-lg font-semibold tracking-tight">
									Lunch Break AI
								</span>
								<span className="block text-xs text-slate-400">
									Garage Door Lead Recovery
								</span>
							</div>
						</div>

						<div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
							<a href="#how" className="hover:text-white">
								How it works
							</a>
							<a href="#beta" className="hover:text-white">
								Beta install
							</a>
							<a href="#faq" className="hover:text-white">
								FAQ
							</a>
						</div>

						<Button
							onClick={scrollToBeta}
							className="rounded-2xl bg-white text-slate-950 hover:bg-slate-200"
						>
							Book setup call
						</Button>
					</nav>

					<div className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
								<Clock className="h-4 w-4" />
								Broken spring leads do not wait for voicemail.
							</div>

							<h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
								Garage door leads call whoever answers first.
							</h1>

							<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
								Lunch Break AI installs a missed-call recovery system for garage
								door companies. It texts back instantly, qualifies the job, asks
								for photos, and sends your team a clean lead summary before the
								customer calls the next company.
							</p>

							<div className="mt-8 flex flex-col gap-4 sm:flex-row">
								<Button
									onClick={scrollToBeta}
									size="lg"
									className="rounded-2xl bg-blue-500 px-7 text-base hover:bg-blue-400"
								>
									Book a 15-minute setup call
									<ArrowRight className="ml-2 h-5 w-5" />
								</Button>

								<Button
									onClick={scrollToDemo}
									size="lg"
									variant="outline"
									className="rounded-2xl border-slate-600 bg-white/5 px-7 text-base text-white hover:bg-white/10"
								>
									See broken-spring demo
								</Button>
							</div>

							<div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
								{garageDoorIssues.map(item => (
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
							id="demo"
							initial={{ opacity: 0, scale: 0.97 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7, delay: 0.1 }}
							className="relative min-w-0 overflow-hidden"
						>
							<Card className="rounded-[2rem] border-white/10 bg-white/10 shadow-2xl shadow-blue-950/50 backdrop-blur">
								<CardContent className="p-6 sm:p-8">
									<div className="mb-6 flex items-center justify-between gap-4">
										<div>
											<p className="text-sm text-slate-300">
												Incoming missed-call lead
											</p>
											<h2 className="text-2xl font-semibold text-white">
												Broken spring — door stuck closed
											</h2>
										</div>

										<div className="rounded-2xl bg-emerald-400/20 px-3 py-2 text-sm text-emerald-200">
											Captured
										</div>
									</div>

									<div className="space-y-4 rounded-3xl bg-slate-950/70 p-5">
										<div className="rounded-2xl bg-blue-500/15 p-4 break-words">
											<p className="text-sm text-blue-100">AI Intake</p>
											<p className="mt-1 text-slate-100">
												“I can help get this routed. Is your garage door stuck
												open, stuck closed, or is the opener not working?”
											</p>
										</div>

										<div className="ml-auto rounded-2xl bg-white/10 p-4 break-words">
											<p className="text-sm text-slate-300">Caller</p>
											<p className="mt-1 text-slate-100">
												“Spring snapped. The door is stuck closed and I need it
												fixed today.”
											</p>
										</div>

										<div className="rounded-2xl border border-white/10 bg-white/5 p-4 break-words">
											<p className="mb-3 text-sm font-medium text-slate-200">
												Lead summary sent to owner
											</p>
											<ul className="space-y-2 text-sm text-slate-300">
												<li>• Caller: Mike</li>
												<li>• Job: Broken spring repair</li>
												<li>• Door status: Stuck closed</li>
												<li>• City: San Jose</li>
												<li>• Urgency: Today</li>
												<li>• Photo: Requested</li>
												<li>• Intent: High — wants service today</li>
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
						<p className="text-4xl font-bold">$600+</p>
						<p className="mt-2 text-slate-300">
							one emergency repair can cover a large part of the system
						</p>
					</div>
					<div>
						<p className="text-4xl font-bold">24/7</p>
						<p className="mt-2 text-slate-300">
							missed-call coverage without hiring another front desk person
						</p>
					</div>
					<div>
						<p className="text-4xl font-bold">60 sec</p>
						<p className="mt-2 text-slate-300">
							from missed call to qualified lead summary
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
						A missed-call recovery system for urgent garage door jobs.
					</h2>
					<p className="mt-4 text-lg text-slate-300">
						Forward missed calls, after-hours calls, or overflow calls. The
						system handles the first response, captures the right information,
						and gets your team the lead while the customer is still ready to
						book.
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
							The leak
						</p>
						<h2 className="mt-3 text-4xl font-bold tracking-tight">
							You already paid to make the phone ring. Voicemail is where the
							job disappears.
						</h2>
					</div>

					<div className="space-y-5 text-lg leading-8 text-slate-700">
						<p>
							A broken spring customer is not patiently waiting for a callback.
							They are stuck, annoyed, and searching for the first company that
							can help.
						</p>
						<p>
							The system catches that moment. Instead of a dead voicemail, the
							customer gets an instant response. Instead of a mystery missed
							call, your team gets a qualified lead with the issue, urgency, and
							photos.
						</p>
					</div>
				</div>
			</section>

			<section id="beta" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						Beta install
					</p>
					<h2 className="mt-3 text-4xl font-bold tracking-tight">
						Three managed installs for garage door companies.
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
						This is not a cheap chatbot subscription. It is a managed
						missed-call recovery system installed, monitored, and tuned for your
						company.
					</p>
				</div>

				<div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.25fr]">
					<Card className="rounded-[2rem] border-blue-400 bg-blue-500/15">
						<CardContent className="p-8">
							<div className="rounded-full bg-blue-400 px-3 py-1 text-xs font-semibold text-slate-950 w-fit">
								Beta rollout
							</div>

							<h3 className="mt-6 text-2xl font-semibold text-white">
								Managed Recovery System
							</h3>

							<div className="mt-6 space-y-5">
								<div>
									<p className="text-sm uppercase tracking-[0.2em] text-blue-200">
										Setup
									</p>
									<p className="mt-1 text-5xl font-bold text-white">$1,500</p>
									<p className="mt-2 text-slate-300">one-time install fee</p>
								</div>

								<div className="border-t border-white/10 pt-5">
									<p className="text-sm uppercase tracking-[0.2em] text-blue-200">
										Management
									</p>
									<p className="mt-1 text-5xl font-bold text-white">$2,000</p>
									<p className="mt-2 text-slate-300">
										per month for monitoring, reporting, and tuning
									</p>
								</div>
							</div>

							<Button className="mt-8 w-full rounded-2xl bg-blue-400 text-slate-950 hover:bg-blue-300">
								Book a 15-minute setup call
							</Button>

							<p className="mt-4 text-sm leading-6 text-slate-300">
								First month focuses on missed-call recovery, garage-door intake,
								lead alerts, basic follow-up, and weekly reporting.
							</p>
						</CardContent>
					</Card>

					<Card className="rounded-[2rem] border-white/10 bg-white/5">
						<CardContent className="p-8">
							<h3 className="text-2xl font-semibold text-white">
								What gets installed
							</h3>

							<ul className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
								{betaIncludes.map(feature => (
									<li key={feature} className="flex gap-3">
										<CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
										<span>{feature}</span>
									</li>
								))}
							</ul>

							<div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/60 p-6">
								<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
									Not included in V1
								</p>
								<p className="mt-3 leading-7 text-slate-300">
									Full dispatch replacement, CRM migration, payroll, technician
									routing, or unlimited custom workflows. The first install
									stays narrow: recover missed calls and turn them into
									qualified garage door leads.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
				<div className="grid gap-6 md:grid-cols-3">
					<Card className="rounded-3xl border-white/10 bg-white/5">
						<CardContent className="p-7">
							<DollarSign className="mb-5 h-8 w-8 text-blue-300" />
							<h3 className="text-xl font-semibold text-white">
								Revenue-first
							</h3>
							<p className="mt-3 text-slate-300">
								Track missed calls recovered, urgent leads captured, and jobs
								that would have disappeared into voicemail.
							</p>
						</CardContent>
					</Card>

					<Card className="rounded-3xl border-white/10 bg-white/5">
						<CardContent className="p-7">
							<Wrench className="mb-5 h-8 w-8 text-blue-300" />
							<h3 className="text-xl font-semibold text-white">
								Garage-door script
							</h3>
							<p className="mt-3 text-slate-300">
								The intake asks about springs, openers, tracks, cables, stuck
								doors, urgency, location, and photos.
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
								Start with call forwarding, SMS alerts, email summaries, and a
								simple lead dashboard.
							</p>
						</CardContent>
					</Card>
				</div>
			</section>

			<section id="faq" className="bg-slate-900 px-6 py-20 lg:px-8">
				<div className="mx-auto max-w-4xl">
					<h2 className="text-4xl font-bold tracking-tight">FAQ</h2>

					<div className="mt-10 space-y-5">
						{faqs.map(([q, a]) => (
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
						Stop letting broken-spring leads hit a dead mailbox.
					</h2>

					<p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50">
						Install a missed-call recovery system that responds instantly,
						qualifies garage door jobs, asks for photos, and sends your team
						ready-to-call lead summaries.
					</p>

					<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							onClick={scrollToBeta}
							size="lg"
							className="rounded-2xl bg-white px-7 text-base text-slate-950 hover:bg-blue-50"
						>
							Book a setup call
						</Button>

						<Button
							onClick={scrollToDemo}
							size="lg"
							variant="outline"
							className="rounded-2xl border-white/40 bg-white/10 px-7 text-base text-white hover:bg-white/20"
						>
							See the demo flow
						</Button>
					</div>
				</div>
			</section>

			<SiteFooter />
		</main>
	);
}
