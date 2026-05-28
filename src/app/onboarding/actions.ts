// src/app/onboarding/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

function getString(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

export async function createBusinessAction(formData: FormData) {
	const businessName = getString(formData, 'business_name');
	const industry = getString(formData, 'industry');
	const websiteUrl = getString(formData, 'website_url');
	const businessPhone = getString(formData, 'business_phone');
	const notificationEmail = getString(formData, 'notification_email');
	const notificationPhone = getString(formData, 'notification_phone');
	const serviceArea = getString(formData, 'service_area');
	const greeting = getString(formData, 'greeting');

	if (!businessName) {
		redirect('/onboarding?error=Business name is required');
	}

	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		redirect('/login');
	}

	const { error } = await supabase.rpc('create_onboarding_business', {
		business_name: businessName,
		business_industry: industry || null,
		business_website_url: websiteUrl || null,
		business_phone: businessPhone || null,
		notification_email: notificationEmail || null,
		notification_phone: notificationPhone || null,
		service_area: serviceArea || null,
		greeting: greeting || null,
	});

	if (error) {
		redirect(`/onboarding?error=${encodeURIComponent(error.message)}`);
	}

	redirect('/dashboard');
}
