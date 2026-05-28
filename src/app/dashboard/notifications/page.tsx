// src/app/dashboard/notifications/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default async function NotificationsPage() {
	const supabase = await createClient();
	const businessId = await getBusinessId();

	const { data: notifications } = await supabase
		.from('notifications')
		.select(
			'id, channel, recipient, subject, status, error_message, sent_at, created_at',
		)
		.eq('business_id', businessId)
		.order('created_at', { ascending: false })
		.limit(50);

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-slate-950">
					Notifications
				</h1>
				<p className="mt-2 text-slate-600">
					Delivery log for lead alerts sent by LunchBreak AI.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent notifications</CardTitle>
				</CardHeader>

				<CardContent>
					{!notifications?.length ? (
						<p className="text-slate-500">No notifications sent yet.</p>
					) : (
						<div className="overflow-hidden rounded-xl border">
							<table className="w-full text-left text-sm">
								<thead className="bg-slate-50 text-slate-500">
									<tr>
										<th className="px-4 py-3">Channel</th>
										<th className="px-4 py-3">Recipient</th>
										<th className="px-4 py-3">Subject</th>
										<th className="px-4 py-3">Status</th>
										<th className="px-4 py-3">Created</th>
									</tr>
								</thead>

								<tbody className="divide-y bg-white">
									{notifications.map(notification => (
										<tr key={notification.id}>
											<td className="px-4 py-4">{notification.channel}</td>
											<td className="px-4 py-4">{notification.recipient}</td>
											<td className="px-4 py-4">
												<p>{notification.subject || 'No subject'}</p>
												{notification.error_message ? (
													<p className="mt-1 text-xs text-red-600">
														{notification.error_message}
													</p>
												) : null}
											</td>
											<td className="px-4 py-4">
												<span
													className={
														notification.status === 'sent'
															? 'rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700'
															: notification.status === 'failed'
																? 'rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700'
																: 'rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700'
													}
												>
													{notification.status}
												</span>
											</td>
											<td className="px-4 py-4 text-slate-500">
												{new Date(notification.created_at).toLocaleString()}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
