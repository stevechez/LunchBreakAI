// src/components/marketing/site-footer.tsx
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';

export function SiteFooter() {
	return (
		<footer className="border-t border-white/10 bg-slate-950 px-6 py-12 text-white lg:px-8">
			<div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
				<div className="max-w-md">
					<Link href="/" className="inline-flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/25">
							<PhoneCall className="h-5 w-5" />
						</div>

						<div>
							<p className="font-semibold tracking-tight">LunchBreak AI</p>
							<p className="text-xs text-slate-400">
								AI receptionist for missed calls
							</p>
						</div>
					</Link>

					<p className="mt-5 text-sm leading-6 text-slate-400">
						LunchBreak AI helps local businesses answer missed calls, capture
						lead details, and notify owners instantly by SMS and email.
					</p>

					<p className="mt-5 text-xs text-slate-500">
						Currently in beta. Built for local service businesses that cannot
						afford to miss ready-to-buy callers.
					</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-3">
					<div>
						<h3 className="text-sm font-semibold text-white">Product</h3>
						<div className="mt-4 space-y-3 text-sm">
							<Link
								href="/#how"
								className="block text-slate-400 hover:text-white"
							>
								How it works
							</Link>
							<Link
								href="/beta"
								className="block text-slate-400 hover:text-white"
							>
								Request beta access
							</Link>
							<Link
								href="/login"
								className="block text-slate-400 hover:text-white"
							>
								Login
							</Link>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-white">For businesses</h3>
						<div className="mt-4 space-y-3 text-sm">
							<span className="block text-slate-400">Home services</span>
							<span className="block text-slate-400">Contractors</span>
							<span className="block text-slate-400">Appointments</span>
							<span className="block text-slate-400">
								Professional services
							</span>
						</div>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-white">Legal</h3>
						<div className="mt-4 space-y-3 text-sm">
							<Link
								href="/privacy"
								className="block text-slate-400 hover:text-white"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="block text-slate-400 hover:text-white"
							>
								Terms of Service
							</Link>
							<Link
								href="/sms-policy"
								className="block text-slate-400 hover:text-white"
							>
								SMS Policy
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
				<p>© {new Date().getFullYear()} LunchBreak AI. All rights reserved.</p>
				<p>Transactional lead alerts only. Message and data rates may apply.</p>
			</div>
		</footer>
	);
}
