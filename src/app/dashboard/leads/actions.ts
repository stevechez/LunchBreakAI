// src/app/dashboard/leads/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

const allowedStatuses = new Set(['new', 'contacted', 'booked', 'lost', 'spam']);

function getString(formData: FormData, key: string) {
	return String(formData.get(key) ?? '').trim();
}

async function getCurrentBusinessId() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect('/login');
	}

	const { data: membership } = await supabase
		.from('business_members')
		.select('business_id')
		.eq('user_id', user.id)
		.limit(1)
		.maybeSingle();

	if (!membership) {
		redirect('/onboarding');
	}

	return membership.business_id;
}

export async function updateLeadStatusAction(formData: FormData) {
	const leadId = getString(formData, 'lead_id');
	const status = getString(formData, 'status');

	if (!leadId || !allowedStatuses.has(status)) {
		redirect('/dashboard/leads');
	}

	const supabase = await createClient();
	const businessId = await getCurrentBusinessId();

	const { error } = await supabase
		.from('leads')
		.update({ status })
		.eq('id', leadId)
		.eq('business_id', businessId);

	if (error) {
		redirect(
			`/dashboard/leads/${leadId}?error=${encodeURIComponent(error.message)}`,
		);
	}

	revalidatePath('/dashboard');
	revalidatePath('/dashboard/leads');
	revalidatePath(`/dashboard/leads/${leadId}`);

	redirect(`/dashboard/leads/${leadId}`);
}
