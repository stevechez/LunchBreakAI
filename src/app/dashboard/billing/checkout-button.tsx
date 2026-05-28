// src/app/dashboard/billing/checkout-button.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { BillingPlanKey } from '@/lib/billing/plans';

export function CheckoutButton({
	planKey,
	children,
}: {
	planKey: BillingPlanKey;
	children: React.ReactNode;
}) {
	const [isLoading, setIsLoading] = useState(false);

	async function startCheckout() {
		setIsLoading(true);

		try {
			const response = await fetch('/api/billing/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ planKey }),
			});

			const data = await response.json();

			if (!response.ok || !data.url) {
				throw new Error(data.error ?? 'Could not start checkout');
			}

			window.location.href = data.url;
		} catch (error) {
			alert(error instanceof Error ? error.message : 'Checkout failed');
			setIsLoading(false);
		}
	}

	return (
		<Button
			type="button"
			onClick={startCheckout}
			disabled={isLoading}
			className="w-full rounded-xl"
		>
			{isLoading ? 'Opening checkout...' : children}
		</Button>
	);
}
