import type { Metadata } from 'next';
import { VerticalLeadRecoveryPage } from '@/components/marketing/VerticalLeadRecoveryPage';
import { verticalLandingPages } from '@/lib/verticalLandingPages';

export const metadata: Metadata = {
	title: 'Septic & Drain Missed-Call Recovery | Lunch Break AI',
	description:
		'AI emergency call screener for septic and drain cleaning companies that captures urgent calls, issue details, property access, and lead summaries.',
};

export default function SepticDrainPage() {
	return <VerticalLeadRecoveryPage config={verticalLandingPages.septicDrain} />;
}
