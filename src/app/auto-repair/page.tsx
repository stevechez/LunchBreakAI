import type { Metadata } from 'next';
import { VerticalLeadRecoveryPage } from '@/components/marketing/VerticalLeadRecoveryPage';
import { verticalLandingPages } from '@/lib/verticalLandingPages';

export const metadata: Metadata = {
	title: 'Auto Repair Service Intake Assistant | Lunch Break AI',
	description:
		'AI service-advisor assistant for auto repair and tire shops that captures missed calls, vehicle details, appointment requests, and repetitive service questions.',
};

export default function AutoRepairPage() {
	return <VerticalLeadRecoveryPage config={verticalLandingPages.autoRepair} />;
}
