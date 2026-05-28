// src/app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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

	const { data: business } = await supabase
		.from('businesses')
		.select('id, name')
		.eq('id', membership.business_id)
		.single();

	if (!business) {
		redirect('/onboarding');
	}

	return (
		<div className="flex min-h-screen bg-slate-100">
			<DashboardNav businessName={business.name} />
			<main className="flex-1 p-8">{children}</main>
		</div>
	);
}
