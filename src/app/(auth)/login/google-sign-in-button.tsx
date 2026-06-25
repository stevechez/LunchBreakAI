'use client';

import { getGoogleSignInUrl } from './actions';
import { useState } from 'react';

export function GoogleSignInButton() {
	const [loading, setLoading] = useState(false);

	async function handleClick() {
		setLoading(true);
		const result = await getGoogleSignInUrl();
		if (result.url) {
			window.location.href = result.url;
		} else {
			setLoading(false);
		}
	}

	return (
		<button
			onClick={handleClick}
			disabled={loading}
			className="mt-4 w-full rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
		>
			{loading ? 'Redirecting...' : 'Continue with Google'}
		</button>
	);
}
