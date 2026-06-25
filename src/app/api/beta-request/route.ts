import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

function getServiceSupabase() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!supabaseUrl || !serviceRoleKey) {
		throw new Error('Missing Supabase service role env vars');
	}

	return createClient(supabaseUrl, serviceRoleKey);
}

function getString(value: unknown) {
	return String(value ?? '').trim();
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const businessName = getString(body.business_name);
		const contactName = getString(body.contact_name);
		const email = getString(body.email).toLowerCase();
		const phone = getString(body.phone);
		const businessType = getString(body.business_type);
		const missedCallProblem = getString(body.missed_call_problem);

		if (!email) {
			return NextResponse.json(
				{ ok: false, error: 'Email is required.' },
				{ status: 400 },
			);
		}

		const supabase = getServiceSupabase();

		const { error } = await supabase.from('beta_requests').insert({
			business_name: businessName || null,
			contact_name: contactName || null,
			email,
			phone: phone || null,
			business_type: businessType || null,
			missed_call_problem: missedCallProblem || null,
			status: 'new',
		});

		if (error) {
			return NextResponse.json(
				{ ok: false, error: error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json({ ok: true });
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Something went wrong.';

		return NextResponse.json({ ok: false, error: message }, { status: 500 });
	}
}
