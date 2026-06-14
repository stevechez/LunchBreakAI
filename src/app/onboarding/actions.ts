// src/app/onboarding/actions.ts
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getDefaultGreeting, normalizeVertical } from '@/lib/verticals';

function getString(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

function onboardingErrorRedirect(vertical: string, message: string): never {
	redirect(
		`/onboarding?vertical=${encodeURIComponent(
			vertical,
		)}&error=${encodeURIComponent(message)}`,
	);
}

export async function createBusinessAction(formData: FormData) {
	const vertical = normalizeVertical(getString(formData, 'vertical'));

	const businessName = getString(formData, 'business_name');
	const industry = getString(formData, 'industry') || vertical;
	const websiteUrl = getString(formData, 'website_url');
	const businessPhone = getString(formData, 'business_phone');
	const notificationEmail = getString(formData, 'notification_email');
	const notificationPhone = getString(formData, 'notification_phone');
	const serviceArea = getString(formData, 'service_area');

	const submittedGreeting = getString(formData, 'greeting');
	const greeting =
		submittedGreeting ||
		getDefaultGreeting(vertical, businessName || 'your business');

	if (!businessName) {
		onboardingErrorRedirect(vertical, 'Business name is required');
	}

	const supabase = await createClient();

	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (userError || !user) {
		redirect(`/login?next=/onboarding?vertical=${vertical}`);
	}

	const { error } = await supabase.rpc('create_onboarding_business', {
		business_name: businessName,
		business_industry: industry || null,
		business_vertical: vertical,
		business_website_url: websiteUrl || null,
		business_phone: businessPhone || null,
		notification_email: notificationEmail || null,
		notification_phone: notificationPhone || null,
		service_area: serviceArea || null,
		greeting,
	});

	if (error) {
		onboardingErrorRedirect(vertical, error.message);
	}

	redirect('/dashboard');
}
