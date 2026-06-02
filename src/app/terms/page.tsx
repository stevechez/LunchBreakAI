// src/app/terms/page.tsx
import { LegalPage } from "@/components/legal/legal-page";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="May 28, 2026">
      <p>
        These Terms of Service govern use of LunchBreak AI, an early-stage beta
        service that helps businesses answer missed calls, capture lead details,
        and send lead notifications.
      </p>

      <h2>Beta product</h2>
      <p>
        LunchBreak AI is currently offered as a beta product. The service may
        change, experience downtime, contain bugs, or be modified as we improve
        the product. Beta access does not guarantee that any feature will remain
        available permanently.
      </p>

      <h2>Use of the service</h2>
      <p>
        You may use LunchBreak AI only for lawful business purposes. You are
        responsible for the information you provide, the phone numbers and email
        addresses you configure, and your follow-up with callers and leads.
      </p>

      <h2>Caller communications</h2>
      <p>
        LunchBreak AI may answer calls, collect caller details, generate
        summaries, and create lead records. You are responsible for ensuring that
        your use of call handling, recording, transcription, SMS, and email
        notifications complies with laws and regulations that apply to your
        business and location.
      </p>

      <h2>SMS and email alerts</h2>
      <p>
        Lead alerts sent by SMS or email are transactional notifications intended
        for business users or authorized staff. You must only configure phone
        numbers and email addresses that you are authorized to use for receiving
        these notifications.
      </p>

      <h2>No guarantee of leads or revenue</h2>
      <p>
        LunchBreak AI is designed to help reduce missed-call lead loss, but we do
        not guarantee any specific number of leads, booked jobs, revenue, or
        business results.
      </p>

      <h2>AI-generated content</h2>
      <p>
        AI-generated transcripts, summaries, urgency labels, lead details, and
        estimated values may be incomplete or inaccurate. You should review lead
        information before relying on it.
      </p>

      <h2>Billing</h2>
      <p>
        Paid plans may be billed through a third-party payment provider. Plan
        prices, included features, trial terms, and billing intervals may change
        over time. Any paid beta terms will be presented during checkout or in
        related communications.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You may not use LunchBreak AI to send spam, harassing messages, illegal
        content, deceptive communications, or messages to people who have not
        authorized or expected such communications. You may not attempt to
        interfere with, abuse, reverse engineer, or overload the service.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        LunchBreak AI is provided on an “as is” and “as available” basis during
        beta. To the maximum extent permitted by law, we are not liable for lost
        profits, lost leads, missed calls, data loss, service interruptions, or
        indirect damages arising from use of the service.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms as the product develops. Continued use of the
        service after changes means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about these terms, contact the LunchBreak AI team through
        the support channel or email address provided with your beta account.
      </p>
    </LegalPage>
  );
}
