import type { VerticalLandingConfig } from '@/components/marketing/VerticalLeadRecoveryPage';

export const verticalLandingPages = {
	selfStorage: {
		brandSubline: 'Self-Storage Rental Assistant',
		eyebrow: 'Storage renters do not wait for voicemail.',
		heroTitle: 'Storage renters choose whoever answers first.',
		heroText:
			'Lunch Break AI installs a missed-call recovery system for self-storage facilities. It answers basic rental questions, captures unit needs, handles gate-hours and move-out questions, and sends your team clean rental leads before the renter calls the next facility.',
		primaryCta: 'Book a 15-minute setup call',
		secondaryCta: 'See rental-intake demo',
		bookingHref: '/signup?vertical=self-storage',
		tags: [
			'Unit sizes',
			'Pricing',
			'Availability',
			'Gate hours',
			'Payments',
			'Move-out questions',
			'Rental intent',
			'After-hours calls',
		],
		demo: {
			kicker: 'Incoming missed-call lead',
			title: '10x10 unit request — needs storage today',
			status: 'Captured',
			aiLabel: 'AI Rental Assistant',
			aiText:
				'I can help get this started. What are you storing, and when do you need the unit?',
			callerLabel: 'Caller',
			callerText:
				'I need a 10x10 or 10x15 today. I am storing furniture and boxes after a move.',
			summaryTitle: 'Rental summary sent to facility',
			summary: [
				'Caller: Dana',
				'Need: 10x10 or 10x15 unit',
				'Move-in: Today',
				'Items: Furniture and boxes',
				'Question: Pricing and availability',
				'Intent: High — ready to rent',
			],
		},
		stats: [
			{
				value: '10/10',
				label: 'ease score for repetitive phone automation',
			},
			{
				value: '24/7',
				label: 'rental-intake coverage without hiring another clerk',
			},
			{
				value: '60 sec',
				label: 'from missed call to rental lead summary',
			},
		],
		how: {
			kicker: 'How it works',
			title: 'A phone rental assistant for storage facilities.',
			text: 'Forward missed calls, after-hours calls, or overflow calls. The system handles the first response, captures the renter’s need, and routes the lead to your team.',
			steps: [
				{
					title: 'A renter calls',
					text: 'They want pricing, availability, gate hours, payment help, or move-in details.',
				},
				{
					title: 'AI captures the rental need',
					text: 'The assistant asks about unit size, move-in date, items being stored, and urgency.',
				},
				{
					title: 'Your team gets the summary',
					text: 'You receive a clean rental lead with contact info, unit need, timing, and intent.',
				},
			],
		},
		leak: {
			kicker: 'The leak',
			title:
				'Most renters are not shopping forever. They rent from the facility that makes it easiest.',
			paragraphs: [
				'A renter calling about storage is usually in motion: moving, downsizing, renovating, separating, or dealing with an urgent space problem.',
				'If that call hits voicemail, they do not wait patiently. They call the next facility, ask the same question, and rent from whoever responds clearly.',
			],
		},
		beta: {
			kicker: 'Beta install',
			title: 'Three managed installs for self-storage facilities.',
			description:
				'This is a managed rental-intake system installed, monitored, and tuned for your facility. It is not a generic chatbot.',
			setupPrice: '$1,500',
			monthlyPrice: '$2,000',
			monthlyDescription:
				'per month for monitoring, reporting, and intake optimization',
			includes: [
				'Missed-call text-back',
				'Self-storage rental intake script',
				'Unit size qualification',
				'Pricing and availability FAQ flow',
				'Gate-hours and move-out routing',
				'Owner or manager SMS/email alerts',
				'Rental lead dashboard',
				'Basic follow-up sequence',
				'Weekly rental recovery report',
			],
			notIncluded:
				'Full facility management, payment processing, lock management, auctions, tenant disputes, or guaranteed real-time inventory unless your systems are connected. V1 stays focused on missed-call recovery and rental lead capture.',
		},
		cards: [
			{
				icon: 'dollar',
				title: 'Rental-first',
				text: 'Track missed calls recovered, ready-to-rent leads captured, and rental conversations that would have disappeared.',
			},
			{
				icon: 'wrench',
				title: 'Storage-specific script',
				text: 'The intake asks about unit size, move-in date, items stored, access needs, pricing, and availability.',
			},
			{
				icon: 'shield',
				title: 'No app required',
				text: 'Start with call forwarding, SMS alerts, email summaries, and a simple rental lead dashboard.',
			},
		],
		faqs: [
			[
				'Can it answer pricing and availability questions?',
				'Yes, using approved facility information. If real-time inventory is not connected, it captures the request and routes it to your team.',
			],
			[
				'Can it handle tenant support questions?',
				'It can route basic questions like gate hours, payments, move-out instructions, and office hours. It should not make account decisions unless connected to your systems.',
			],
			[
				'Do I need to change my facility phone number?',
				'No. Start by forwarding missed calls, after-hours calls, or overflow calls.',
			],
			[
				'What does my team receive?',
				'A clean rental summary with name, phone, unit need, move-in timing, questions, and rental intent.',
			],
		],
		finalCta: {
			title: 'Stop letting ready-to-rent callers hit voicemail.',
			text: 'Install a rental-intake system that responds instantly, captures unit needs, answers approved questions, and sends your team ready-to-call storage leads.',
		},
	},

	septicDrain: {
		brandSubline: 'Septic & Drain Emergency Screener',
		eyebrow: 'Backed-up drains do not wait for callbacks.',
		heroTitle: 'Septic emergencies call whoever responds first.',
		heroText:
			'Lunch Break AI installs a missed-call recovery system for septic and drain cleaning companies. It responds instantly, screens the emergency, captures access details, and sends your team a clean job summary before the customer calls another company.',
		primaryCta: 'Book a 15-minute setup call',
		secondaryCta: 'See emergency-screening demo',
		bookingHref: '/signup?vertical=septic-drain',
		tags: [
			'Main line backup',
			'Septic alarm',
			'Toilet backup',
			'Drain clog',
			'Property access',
			'Standing water',
			'After-hours calls',
			'Emergency routing',
		],
		demo: {
			kicker: 'Incoming missed-call lead',
			title: 'Main line backup — urgent service request',
			status: 'Captured',
			aiLabel: 'AI Emergency Screener',
			aiText:
				'I can help get this routed. Are you dealing with a drain clog, sewage backup, septic alarm, or standing water?',
			callerLabel: 'Caller',
			callerText:
				'The toilets are backing up and there is sewage coming into the tub. We need someone today.',
			summaryTitle: 'Emergency summary sent to owner',
			summary: [
				'Caller: Robert',
				'Issue: Sewage backup',
				'Location: Salinas',
				'Urgency: Today / emergency',
				'Property type: Single-family home',
				'Access: Someone is home',
				'Intent: High — needs service now',
			],
		},
		stats: [
			{
				value: '9/10',
				label: 'ease score for urgent intake automation',
			},
			{
				value: '24/7',
				label: 'emergency screening without another dispatcher',
			},
			{
				value: '60 sec',
				label: 'from missed call to urgent job summary',
			},
		],
		how: {
			kicker: 'How it works',
			title: 'An emergency call screener for septic and drain jobs.',
			text: 'Forward missed calls, after-hours calls, or overflow calls. The system screens the issue, captures urgency and access details, and alerts your team fast.',
			steps: [
				{
					title: 'A customer calls with a mess',
					text: 'They have a backed-up toilet, clogged main line, septic alarm, smell, standing water, or sewage issue.',
				},
				{
					title: 'AI screens the emergency',
					text: 'The assistant asks about issue type, property type, urgency, access, location, and whether someone is on-site.',
				},
				{
					title: 'Your team gets the job summary',
					text: 'You receive the details needed to decide priority and call the customer back fast.',
				},
			],
		},
		leak: {
			kicker: 'The leak',
			title:
				'Nobody with sewage backing up is waiting around for your voicemail greeting.',
			paragraphs: [
				'Septic and drain calls are ugly, urgent, and emotional. Customers want the first competent company that responds.',
				'The AI does not diagnose the job. It captures the emergency clearly so your team can call back with context instead of starting from zero.',
			],
		},
		beta: {
			kicker: 'Beta install',
			title: 'Three managed installs for septic and drain companies.',
			description:
				'This is a managed emergency-intake system installed, monitored, and tuned for septic and drain cleaning calls.',
			setupPrice: '$1,500',
			monthlyPrice: '$2,000',
			monthlyDescription:
				'per month for monitoring, reporting, and intake optimization',
			includes: [
				'Missed-call text-back',
				'Septic and drain emergency intake script',
				'Issue and urgency qualification',
				'Property type and access questions',
				'Photo or video request when useful',
				'Owner SMS and email alerts',
				'Urgent job lead dashboard',
				'Basic follow-up sequence',
				'Weekly recovery report',
			],
			notIncluded:
				'Full dispatch replacement, technician routing, diagnosis, permit advice, warranty decisions, or safety-critical instructions. V1 stays focused on missed-call recovery, emergency screening, and lead handoff.',
		},
		cards: [
			{
				icon: 'dollar',
				title: 'Emergency-first',
				text: 'Track urgent calls recovered, high-intent jobs captured, and emergency leads that would have gone to a competitor.',
			},
			{
				icon: 'wrench',
				title: 'Drain-specific script',
				text: 'The intake asks about backups, clogs, septic alarms, smells, standing water, property type, access, and urgency.',
			},
			{
				icon: 'shield',
				title: 'Safe handoff',
				text: 'The system captures details and routes the lead. Your team still handles diagnosis, pricing, and dispatch decisions.',
			},
		],
		faqs: [
			[
				'Does the AI diagnose septic problems?',
				'No. It screens the issue and collects details so your team can respond faster. Diagnosis stays with your company.',
			],
			[
				'Can it tell which jobs are urgent?',
				'It can tag urgency based on your rules: sewage backup, no working toilets, standing water, septic alarm, or after-hours emergency.',
			],
			[
				'Can it ask about property access?',
				'Yes. It can collect property type, whether someone is home, gate codes, animals, access notes, and preferred callback time.',
			],
			[
				'Do I need a new phone number?',
				'No. Start with call forwarding for missed calls, overflow calls, or after-hours calls.',
			],
		],
		finalCta: {
			title: 'Stop sending emergency drain calls to voicemail.',
			text: 'Install an emergency screening system that responds instantly, captures the issue, collects access details, and sends your team ready-to-call job summaries.',
		},
	},

	autoRepair: {
		brandSubline: 'Auto Repair & Tire Service Advisor',
		eyebrow: 'Your service desk is answering the same calls all day.',
		heroTitle: 'Auto repair calls repeat themselves every hour.',
		heroText:
			'Lunch Break AI installs a service-advisor assistant for auto repair and tire shops. It handles missed calls, status questions, appointment requests, tire inquiries, and basic service intake so your team can stay focused on the bays.',
		primaryCta: 'Book a 15-minute setup call',
		secondaryCta: 'See service-advisor demo',
		bookingHref: '/signup?vertical=auto-repair',
		tags: [
			'Is my car ready?',
			'Oil change request',
			'Brake quote',
			'Tire availability',
			'Appointment request',
			'Vehicle details',
			'After-hours calls',
			'Service follow-up',
		],
		demo: {
			kicker: 'Incoming missed-call lead',
			title: 'Brake quote + same-day appointment request',
			status: 'Captured',
			aiLabel: 'AI Service Assistant',
			aiText:
				'I can help get this routed. What vehicle do you have, and are you looking for brakes, tires, maintenance, or a repair?',
			callerLabel: 'Caller',
			callerText:
				'It is a 2017 Toyota Camry. The brakes are grinding and I want to know if you can look at it today.',
			summaryTitle: 'Service summary sent to shop',
			summary: [
				'Caller: Maria',
				'Vehicle: 2017 Toyota Camry',
				'Need: Brake inspection / grinding noise',
				'Timing: Wants today',
				'Question: Availability and estimate',
				'Intent: High — ready to book',
			],
		},
		stats: [
			{
				value: '8.5/10',
				label: 'ease score for repetitive service desk automation',
			},
			{
				value: '24/7',
				label: 'missed-call and overflow coverage for service requests',
			},
			{
				value: '60 sec',
				label: 'from missed call to service lead summary',
			},
		],
		how: {
			kicker: 'How it works',
			title: 'A service-advisor assistant for repetitive shop calls.',
			text: 'Forward missed calls, after-hours calls, or overflow calls. The system captures vehicle details, service needs, timing, and customer questions.',
			steps: [
				{
					title: 'A customer calls the shop',
					text: 'They ask about status, oil changes, brakes, tires, pricing, appointments, or whether the car is ready.',
				},
				{
					title: 'AI collects service details',
					text: 'The assistant asks for vehicle year/make/model, issue, timing, contact info, and appointment preference.',
				},
				{
					title: 'Your team gets the summary',
					text: 'Your service desk receives a clean lead summary instead of another vague voicemail.',
				},
			],
		},
		leak: {
			kicker: 'The leak',
			title:
				'Your service advisor should not lose half the day answering the same five questions.',
			paragraphs: [
				'Auto repair and tire shops get buried in repeat calls: status checks, tire questions, oil change availability, brake quotes, and appointment requests.',
				'The system does not replace your service judgment. It filters and organizes the repetitive front-desk work so your team can respond with context.',
			],
		},
		beta: {
			kicker: 'Beta install',
			title: 'Three managed installs for auto repair and tire shops.',
			description:
				'This is a managed service-intake system installed, monitored, and tuned for repetitive shop calls.',
			setupPrice: '$1,500',
			monthlyPrice: '$2,000',
			monthlyDescription:
				'per month for monitoring, reporting, and intake optimization',
			includes: [
				'Missed-call text-back',
				'Auto repair service intake script',
				'Vehicle year/make/model capture',
				'Brake, tire, oil change, and repair routing',
				'Appointment request collection',
				'Owner or service desk SMS/email alerts',
				'Service lead dashboard',
				'Basic follow-up sequence',
				'Weekly call recovery report',
			],
			notIncluded:
				'Full shop-management software replacement, POS integration, mechanic diagnosis, warranty decisions, parts ordering, or real-time tire inventory unless connected later. V1 stays focused on missed-call recovery and service intake.',
		},
		cards: [
			{
				icon: 'dollar',
				title: 'Bay-time first',
				text: 'Reduce repetitive call drag so the service desk can focus on booked work, approvals, and customers already in the shop.',
			},
			{
				icon: 'wrench',
				title: 'Shop-specific script',
				text: 'The intake asks about vehicle details, issue type, timing, appointment preference, and whether the customer needs tires, brakes, maintenance, or repair.',
			},
			{
				icon: 'shield',
				title: 'No diagnosis risk',
				text: 'The system captures and routes requests. Your team still handles diagnosis, estimates, approvals, and repair decisions.',
			},
		],
		faqs: [
			[
				'Can it answer “Is my car ready?”',
				'It can collect the request and route it to your service desk. Real-time status answers require integration with your shop system.',
			],
			[
				'Can it handle tire availability?',
				'It can capture tire size, vehicle, brand preference, and urgency. Real-time inventory requires a later system connection.',
			],
			[
				'Does it replace my service advisor?',
				'No. It handles repetitive intake and missed-call recovery. Your advisor still handles pricing, approvals, diagnosis, and customer decisions.',
			],
			[
				'Do I need to change my shop number?',
				'No. Start by forwarding missed calls, after-hours calls, or overflow calls.',
			],
		],
		finalCta: {
			title: 'Stop letting repetitive shop calls bury your service desk.',
			text: 'Install a service-intake assistant that responds instantly, captures vehicle details, routes requests, and sends your team clean service summaries.',
		},
	},
} satisfies Record<
	'selfStorage' | 'septicDrain' | 'autoRepair',
	VerticalLandingConfig
>;
