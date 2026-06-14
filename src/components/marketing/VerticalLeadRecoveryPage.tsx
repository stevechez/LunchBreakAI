'use client';

import Link from 'next/link';
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

export type VerticalLandingConfig = {
	brandSubline: string;
	eyebrow: string;
	heroTitle: string;
	heroText: string;
	primaryCta: string;
	secondaryCta: string;
	bookingHref: string;
	tags: string[];
	demo: {
		kicker: string;
		title: string;
		status: string;
		aiLabel: string;
		aiText: string;
		callerLabel: string;
		callerText: string;
		summaryTitle: string;
		summary: string[];
	};
	stats: {
		value: string;
		label: string;
	}[];
	how: {
		kicker: string;
		title: string;
		text: string;
		steps: {
			title: string;
			text: string;
		}[];
	};
	leak: {
		kicker: string;
		title: string;
		paragraphs: string[];
	};
	beta: {
		kicker: string;
		title: string;
		description: string;
		setupPrice: string;
		monthlyPrice: string;
		monthlyDescription: string;
		includes: string[];
		notIncluded: string;
	};
	cards: {
		icon: 'dollar' | 'wrench' | 'shield';
		title: string;
		text: string;
	}[];
	faqs: [string, string][];
	finalCta: {
		title: string;
		text: string;
	};
};

const stepIcons = [PhoneCall, MessageSquareText, Zap];

const cardIcons = {
	dollar: DollarSign,
	wrench: Wrench,
	shield: ShieldCheck,
};

export function VerticalLeadRecoveryPage({
	config,
}: {
	config: VerticalLandingConfig;
}) {
	const scrollToDemo = () => {
		document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<main className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
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
									{config.brandSubline}
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
							asChild
							className="rounded-2xl bg-white text-slate-950 hover:bg-slate-200"
						>
							<Link href={config.bookingHref}>Book setup call</Link>
						</Button>
					</nav>

					<div className="grid min-w-0 items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
						>
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm text-blue-100">
								<Clock className="h-4 w-4" />
								{config.eyebrow}
							</div>

							<h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
								{config.heroTitle}
							</h1>

							<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
								{config.heroText}
							</p>

							<div className="mt-8 flex flex-col gap-4 sm:flex-row">
								<Button
									asChild
									size="lg"
									className="rounded-2xl bg-blue-500 px-7 text-base hover:bg-blue-400"
								>
									<Link href={config.bookingHref}>
										{config.primaryCta}
										<ArrowRight className="ml-2 h-5 w-5" />
									</Link>
								</Button>

								<Button
									onClick={scrollToDemo}
									size="lg"
									variant="outline"
									className="rounded-2xl border-slate-600 bg-white/5 px-7 text-base text-white hover:bg-white/10"
								>
									{config.secondaryCta}
								</Button>
							</div>

							<div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
								{config.tags.map(item => (
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
							<Card className="overflow-hidden rounded-[2rem] border-white/10 bg-white/10 shadow-2xl shadow-blue-950/50 backdrop-blur">
								<CardContent className="p-6 sm:p-8">
									<div className="mb-6 flex items-center justify-between gap-4">
										<div>
											<p className="text-sm text-slate-300">
												{config.demo.kicker}
											</p>
											<h2 className="text-2xl font-semibold text-white">
												{config.demo.title}
											</h2>
										</div>

										<div className="rounded-2xl bg-emerald-400/20 px-3 py-2 text-sm text-emerald-200">
											{config.demo.status}
										</div>
									</div>

									<div className="min-w-0 space-y-4 rounded-3xl bg-slate-950/70 p-5">
										<div className="break-words rounded-2xl bg-blue-500/15 p-4">
											<p className="text-sm text-blue-100">
												{config.demo.aiLabel}
											</p>
											<p className="mt-1 text-slate-100">
												“{config.demo.aiText}”
											</p>
										</div>

										<div className="ml-auto break-words rounded-2xl bg-white/10 p-4">
											<p className="text-sm text-slate-300">
												{config.demo.callerLabel}
											</p>
											<p className="mt-1 text-slate-100">
												“{config.demo.callerText}”
											</p>
										</div>

										<div className="break-words rounded-2xl border border-white/10 bg-white/5 p-4">
											<p className="mb-3 text-sm font-medium text-slate-200">
												{config.demo.summaryTitle}
											</p>
											<ul className="space-y-2 text-sm text-slate-300">
												{config.demo.summary.map(item => (
													<li key={item}>• {item}</li>
												))}
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
					{config.stats.map(stat => (
						<div key={stat.value}>
							<p className="text-4xl font-bold">{stat.value}</p>
							<p className="mt-2 text-slate-300">{stat.label}</p>
						</div>
					))}
				</div>
			</section>

			<section id="how" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						{config.how.kicker}
					</p>
					<h2 className="mt-3 text-4xl font-bold tracking-tight">
						{config.how.title}
					</h2>
					<p className="mt-4 text-lg text-slate-300">{config.how.text}</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{config.how.steps.map((step, index) => {
						const StepIcon = stepIcons[index] ?? PhoneCall;

						return (
							<Card
								key={step.title}
								className="rounded-3xl border-white/10 bg-white/5"
							>
								<CardContent className="p-7">
									<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-200">
										<StepIcon className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-semibold text-white">
										{step.title}
									</h3>
									<p className="mt-3 leading-7 text-slate-300">{step.text}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>

			<section className="bg-white px-6 py-20 text-slate-950 lg:px-8">
				<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
							{config.leak.kicker}
						</p>
						<h2 className="mt-3 text-4xl font-bold tracking-tight">
							{config.leak.title}
						</h2>
					</div>

					<div className="space-y-5 text-lg leading-8 text-slate-700">
						{config.leak.paragraphs.map(paragraph => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
				</div>
			</section>

			<section id="beta" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
				<div className="text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
						{config.beta.kicker}
					</p>
					<h2 className="mt-3 text-4xl font-bold tracking-tight">
						{config.beta.title}
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
						{config.beta.description}
					</p>
				</div>

				<div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.25fr]">
					<Card className="rounded-[2rem] border-blue-400 bg-blue-500/15">
						<CardContent className="p-8">
							<div className="w-fit rounded-full bg-blue-400 px-3 py-1 text-xs font-semibold text-slate-950">
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
									<p className="mt-1 text-5xl font-bold text-white">
										{config.beta.setupPrice}
									</p>
									<p className="mt-2 text-slate-300">one-time install fee</p>
								</div>

								<div className="border-t border-white/10 pt-5">
									<p className="text-sm uppercase tracking-[0.2em] text-blue-200">
										Management
									</p>
									<p className="mt-1 text-5xl font-bold text-white">
										{config.beta.monthlyPrice}
									</p>
									<p className="mt-2 text-slate-300">
										{config.beta.monthlyDescription}
									</p>
								</div>
							</div>

							<Button
								asChild
								className="mt-8 w-full rounded-2xl bg-blue-400 text-slate-950 hover:bg-blue-300"
							>
								<Link href={config.bookingHref}>
									Book a 15-minute setup call
								</Link>
							</Button>

							<p className="mt-4 text-sm leading-6 text-slate-300">
								First month focuses on missed-call recovery, intake, alerts,
								basic follow-up, and weekly reporting.
							</p>
						</CardContent>
					</Card>

					<Card className="rounded-[2rem] border-white/10 bg-white/5">
						<CardContent className="p-8">
							<h3 className="text-2xl font-semibold text-white">
								What gets installed
							</h3>

							<ul className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
								{config.beta.includes.map(feature => (
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
									{config.beta.notIncluded}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			<section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
				<div className="grid gap-6 md:grid-cols-3">
					{config.cards.map(card => {
						const CardIcon = cardIcons[card.icon];

						return (
							<Card
								key={card.title}
								className="rounded-3xl border-white/10 bg-white/5"
							>
								<CardContent className="p-7">
									<CardIcon className="mb-5 h-8 w-8 text-blue-300" />
									<h3 className="text-xl font-semibold text-white">
										{card.title}
									</h3>
									<p className="mt-3 text-slate-300">{card.text}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</section>

			<section id="faq" className="bg-slate-900 px-6 py-20 lg:px-8">
				<div className="mx-auto max-w-4xl">
					<h2 className="text-4xl font-bold tracking-tight">FAQ</h2>

					<div className="mt-10 space-y-5">
						{config.faqs.map(([q, a]) => (
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
						{config.finalCta.title}
					</h2>

					<p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50">
						{config.finalCta.text}
					</p>

					<div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
						<Button
							asChild
							size="lg"
							className="rounded-2xl bg-white px-7 text-base text-slate-950 hover:bg-blue-50"
						>
							<Link href={config.bookingHref}>Book a setup call</Link>
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
