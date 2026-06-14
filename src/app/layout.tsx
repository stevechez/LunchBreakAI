import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Lunch Break AI',
	description: 'Missed-call recovery for local service businesses.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn(
				'h-full scroll-smooth antialiased',
				geistSans.variable,
				geistMono.variable,
			)}
		>
			<body className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
				{children}
			</body>
		</html>
	);
}
