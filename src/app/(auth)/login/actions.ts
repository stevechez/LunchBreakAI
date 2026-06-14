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
