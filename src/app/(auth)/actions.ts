// src/app/(auth)/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function getString(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

export async function loginAction(formData: FormData) {
	const email = getString(formData, 'email');
	const password = getString(formData, 'password');

	if (!email || !password) {
		redirect('/login?error=Email and password are required');
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		redirect(`/login?error=${encodeURIComponent(error.message)}`);
	}

	redirect('/dashboard');
}

export async function signInWithGoogleAction() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard`,
		},
	});

	if (error || !data.url) {
		redirect(
			`/login?error=${encodeURIComponent(
				error?.message ?? 'Google sign-in failed',
			)}`,
		);
	}

	redirect(data.url);
}

export async function signupAction(formData: FormData) {
	const email = getString(formData, 'email');
	const password = getString(formData, 'password');
	const fullName = getString(formData, 'full_name');

	if (!email || !password) {
		redirect('/signup?error=Email and password are required');
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				full_name: fullName,
			},
			emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/onboarding`,
		},
	});

	if (error) {
		redirect(`/signup?error=${encodeURIComponent(error.message)}`);
	}

	// If email confirmation is disabled, the user will be logged in.
	// If enabled, they will need to confirm email first.
	redirect('/onboarding');
}
