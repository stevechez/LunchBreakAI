// src/app/(auth)/signup/page.tsx
import Link from 'next/link';
import { signupAction } from '../actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type SignupPageProps = {
	searchParams: Promise<{
		error?: string;
	}>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
	const params = await searchParams;

	return (
		<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
			<Card className="w-full max-w-md border-white/10 bg-white/5 text-white">
				<CardHeader>
					<CardTitle className="text-2xl">
						Create your LunchBreak AI account
					</CardTitle>
				</CardHeader>

				<CardContent>
					{params.error ? (
						<div className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-100">
							{params.error}
						</div>
					) : null}

					<form action={signupAction} className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="full_name">Name</Label>
							<Input
								id="full_name"
								name="full_name"
								type="text"
								className="bg-white text-slate-950"
							/>
						</div>

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
								minLength={8}
								className="bg-white text-slate-950"
							/>
						</div>

						<Button className="w-full rounded-xl">Create account</Button>
					</form>

					<p className="mt-6 text-sm text-slate-300">
						Already have an account?{' '}
						<Link href="/login" className="text-blue-300 hover:text-blue-200">
							Log in
						</Link>
					</p>
				</CardContent>
			</Card>
		</main>
	);
}
