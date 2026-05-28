// src/components/dashboard/dashboard-nav.tsx
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { signOutAction } from '@/app/dashboard/actions';
import { Button } from '@/components/ui/button';

export function DashboardNav({ businessName }: { businessName: string }) {
	return (
		<aside className="flex min-h-screen w-72 flex-col border-r border-white/10 bg-slate-950 px-5 py-6 text-white">
			<Link href="/dashboard" className="mb-8 flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500">
					<PhoneCall className="h-5 w-5" />
				</div>
				<div>
					<p className="font-semibold">LunchBreak AI</p>
					<p className="text-xs text-slate-400">{businessName}</p>
				</div>
			</Link>

			<nav className="space-y-1 text-sm">
				<Link
					href="/dashboard"
					className="block rounded-xl px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
				>
					Overview
				</Link>

				<Link
					href="/dashboard/leads"
					className="block rounded-xl px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
				>
					Leads
				</Link>
				<Link
					href="/dashboard/notifications"
					className="block rounded-xl px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
				>
					Notifications
				</Link>
				<Link
					href="/dashboard/intake-script"
					className="block rounded-xl px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
				>
					Intake Script
				</Link>

				<Link
					href="/dashboard/settings"
					className="block rounded-xl px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
				>
					Receptionist Settings
				</Link>

				<Link
					href="/dashboard/billing"
					className="block rounded-xl px-3 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
				>
					Billing
				</Link>
			</nav>

			<form action={signOutAction} className="mt-auto">
				<Button
					variant="outline"
					className="w-full rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
				>
					Sign out
				</Button>
			</form>
		</aside>
	);
}
