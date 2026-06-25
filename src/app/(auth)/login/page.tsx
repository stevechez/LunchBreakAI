import Link from 'next/link';
import { loginAction } from './actions';
import { GoogleSignInButton } from './google-sign-in-button';

type LoginPageProps = {
	searchParams?: Promise<{
		error?: string;
		message?: string;
	}>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
	const params = await searchParams;

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
			<div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
				<div className="mb-8 text-center">
					<p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-200">
						Lunch Break AI
					</p>

					<h1 className="text-3xl font-bold tracking-tight">Log in</h1>

					<p className="mt-3 text-sm leading-6 text-slate-300">
						Access your missed-call lead dashboard.
					</p>
				</div>

				{params?.error ? (
					<div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
						{params.error}
					</div>
				) : null}

				{params?.message ? (
					<div className="mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
						{params.message}
					</div>
				) : null}

				<form action={loginAction} className="space-y-5">
					<div>
						<label className="mb-2 block text-sm font-medium text-slate-200">
							Email
						</label>
						<input
							name="email"
							type="email"
							required
							className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-300"
							placeholder="you@example.com"
						/>
					</div>

					<div>
						<label className="mb-2 block text-sm font-medium text-slate-200">
							Password
						</label>
						<input
							name="password"
							type="password"
							required
							className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-300"
							placeholder="••••••••"
						/>
					</div>

					<button
						type="submit"
						className="w-full rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
					>
						Log in
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-slate-300">
					Need an account?{' '}
					<Link href="/signup" className="font-semibold text-white underline">
						Start free demo
					</Link>
				</p>
				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-white/10" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white/[0.04] px-3 text-slate-400">or</span>
						</div>
					</div>

					<GoogleSignInButton />
				</div>
			</div>
		</main>
	);
}
