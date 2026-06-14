import type { Metadata } from 'next';
import { VerticalLeadRecoveryPage } from '@/components/marketing/VerticalLeadRecoveryPage';
import { verticalLandingPages } from '@/lib/verticalLandingPages';

export const metadata: Metadata = {
	title: 'Self-Storage Missed-Call Recovery | Lunch Break AI',
	description:
		'AI rental assistant for self-storage facilities that captures missed calls, rental questions, unit needs, and move-in intent.',
};

export default function SelfStoragePage() {
	return <VerticalLeadRecoveryPage config={verticalLandingPages.selfStorage} />;
}
