// src/app/dashboard/leads/create-demo-lead-button.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CreateDemoLeadButton() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	async function createDemoLead() {
		setIsLoading(true);

		try {
			const response = await fetch('/api/demo/create-lead', {
				method: 'POST',
			});

			const data = await response.json();

			if (!response.ok || !data.leadId) {
				throw new Error(data.error ?? 'Failed to create demo lead');
			}

			router.push(`/dashboard/leads/${data.leadId}`);
			router.refresh();
		} catch (error) {
			alert(error instanceof Error ? error.message : 'Failed to create lead');
			setIsLoading(false);
		}
	}

	return (
		<Button
			onClick={createDemoLead}
			disabled={isLoading}
			className="rounded-xl"
		>
			{isLoading ? 'Capturing missed call...' : 'Simulate missed call'}
		</Button>
	);
}
