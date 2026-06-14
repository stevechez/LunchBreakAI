import Link from 'next/link';
import { signupAction } from './actions';

type SignupPageProps = {
	searchParams?: Promise<{
		error?: string;
		message?: string;
	}>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
	const params = await searchParams;

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-white">
			<div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
				<div className="mb-8 text-center">
					<p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-200">
						Lunch Break AI
					</p>

					<h1 className="text-3xl font-bold tracking-tight">Start free demo</h1>

					<p className="mt-3 text-sm leading-6 text-slate-300">
						Create your account, set up your business, and test the missed-call
						demo.
					</p>
				</div>

				{params?.error ? (
					<div className="mb-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
						{params.error}
					</div>
				) : null}

				<form action={signupAction} className="space-y-5">
					<div>
						<label className="mb-2 block text-sm font-medium text-slate-200">
							Name
						</label>
						<input
							name="name"
							type="text"
							className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-300"
							placeholder="Steve"
						/>
					</div>

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
							minLength={8}
							className="w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-slate-950 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-300"
							placeholder="At least 8 characters"
						/>
					</div>

					<button
						type="submit"
						className="w-full rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
					>
						Create account
					</button>
				</form>

				<p className="mt-6 text-center text-sm text-slate-300">
					Already have an account?{' '}
					<Link href="/login" className="font-semibold text-white underline">
						Log in
					</Link>
				</p>
			</div>
		</main>
	);
}
