'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function getString(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

export async function signupAction(formData: FormData) {
	const name = getString(formData, 'name');
	const email = getString(formData, 'email');
	const password = getString(formData, 'password');

	if (!email || !password) {
		redirect('/signup?error=Email and password are required');
	}

	if (password.length < 8) {
		redirect('/signup?error=Password must be at least 8 characters');
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				name,
			},
		},
	});

	if (error) {
		redirect(`/signup?error=${encodeURIComponent(error.message)}`);
	}

	redirect('/onboarding');
}
