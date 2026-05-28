// src/app/(auth)/login/page.tsx
import Link from 'next/link';
import { loginAction, signInWithGoogleAction } from '../actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginPageProps = {
	searchParams: Promise<{
		error?: string;
	}>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
	const params = await searchParams;

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
			<Card className="w-full max-w-md border-white/10 bg-white/5 text-white">
				<CardHeader>
					<CardTitle className="text-2xl">Log in to LunchBreak AI</CardTitle>
				</CardHeader>

				<CardContent>
					{params.error ? (
						<div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
							{params.error}
						</div>
					) : null}
					<form action={signInWithGoogleAction}>
						<Button
							type="submit"
							variant="outline"
							className="w-full rounded-xl border-white/10 bg-white text-slate-950 hover:bg-slate-100"
						>
							Continue with Google
						</Button>
					</form>
					<div className="my-6 flex items-center gap-3">
						<div className="h-px flex-1 bg-white/10" />
						<span className="text-xs uppercase tracking-wide text-slate-400">
							or
						</span>
						<div className="h-px flex-1 bg-white/10" />
					</div>
					So the order is:
					<form action={loginAction} className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								required
								className="bg-white text-slate-950"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								required
								className="bg-white text-slate-950"
							/>
						</div>

						<Button className="w-full rounded-xl">Log in</Button>
					</form>
					<p className="mt-6 text-sm text-slate-300">
						No account yet?{' '}
						<Link href="/signup" className="text-blue-300 hover:text-blue-200">
							Create one
						</Link>
					</p>
				</CardContent>
			</Card>
		</main>
	);
}
