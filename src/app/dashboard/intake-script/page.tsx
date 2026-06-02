// src/app/dashboard/intake-script/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { IntakeScriptForm } from './intake-script-form';

type IntakeScriptPageProps = {
	searchParams: Promise<{
		error?: string;
		saved?: string;
	}>;
};

async function getBusinessId() {
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

export default async function IntakeScriptPage({
	searchParams,
}: IntakeScriptPageProps) {
	const params = await searchParams;
	const supabase = await createClient();
	const businessId = await getBusinessId();

	const { data: script } = await supabase
		.from('intake_scripts')
		.select(
			'id, name, industry, prompt, required_fields, custom_questions, is_active',
		)
		.eq('business_id', businessId)
		.eq('is_active', true)
		.limit(1)
		.maybeSingle();

	if (!script) {
		return (
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-slate-950">
					Intake script
				</h1>
				<p className="mt-2 text-slate-600">
					No intake script found. Complete onboarding again or create a script
					from the database for now.
				</p>
			</div>
		);
	}

	return (
		<div>
			<div className="mb-8">
				<p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
					Receptionist behavior
				</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
					Intake script
				</h1>
				<p className="mt-2 max-w-3xl text-slate-600">
					Choose a vertical template, customize the intake questions, and
					control what your AI receptionist will and will not say to callers.
				</p>
			</div>

			{params.error ? (
				<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
					{params.error}
				</div>
			) : null}

			{params.saved ? (
				<div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
					Intake script saved.
				</div>
			) : null}

			<IntakeScriptForm script={script} />
		</div>
	);
}
