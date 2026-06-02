// src/app/sms-policy/page.tsx
import { LegalPage } from "@/components/legal/legal-page";

export default function SmsPolicyPage() {
  return (
    <LegalPage title="SMS Policy" updated="May 28, 2026">
      <p>
        LunchBreak AI sends transactional SMS lead alerts to business owners or
        authorized staff when their AI receptionist captures a new inbound caller
        lead.
      </p>

      <h2>What messages are sent</h2>
      <p>
        SMS alerts may include caller name, callback number, requested service,
        urgency, a short lead summary, and a dashboard link where the business
        can review the lead.
      </p>

      <h2>Who receives messages</h2>
      <p>
        Messages are sent only to phone numbers configured by the business
        account owner or authorized business user inside the LunchBreak AI
        dashboard.
      </p>

      <h2>Opt-in</h2>
      <p>
        Business users opt in by entering their notification phone number in the
        LunchBreak AI dashboard settings and saving that number for lead alerts.
        By doing so, they consent to receive transactional SMS notifications
        related to their business account.
      </p>

      <h2>Message frequency</h2>
      <p>
        Message frequency varies based on call volume and the number of leads
        captured by the AI receptionist. During beta, volume is expected to be
        low.
      </p>

      <h2>Message and data rates</h2>
      <p>
        Message and data rates may apply depending on your mobile carrier and
        plan.
      </p>

      <h2>Opt-out</h2>
      <p>
        Recipients may reply STOP to opt out of SMS notifications where supported
        by the messaging provider. Business users can also remove or change their
        notification phone number inside the LunchBreak AI dashboard.
      </p>

      <h2>Help</h2>
      <p>
        Recipients may reply HELP for assistance where supported by the messaging
        provider. Business users can also contact LunchBreak AI support through
        the support channel or email address provided with their account.
      </p>

      <h2>Example message</h2>
      <pre className="whitespace-pre-wrap rounded-xl bg-slate-950 p-4 text-sm text-white">
{`New LunchBreak lead: Local moving quote
Caller: Sarah Johnson
Phone: +16505551212
Summary: Needs a local move from Palo Alto to Mountain View.
View: https://lunch-break-ai.vercel.app/dashboard/leads/123
Reply STOP to opt out.`}
      </pre>

      <h2>No marketing messages</h2>
      <p>
        LunchBreak AI SMS alerts are transactional lead notifications. We do not
        use this SMS program to send promotional or marketing messages to
        consumers.
      </p>

      <h2>Privacy</h2>
      <p>
        For more information about how LunchBreak AI handles information, please
        review our Privacy Policy.
      </p>
    </LegalPage>
  );
}
