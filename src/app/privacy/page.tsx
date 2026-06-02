// src/app/privacy/page.tsx
import { LegalPage } from "@/components/legal/legal-page";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="May 28, 2026">
      <p>
        LunchBreak AI is an early-stage beta product that helps businesses answer
        missed calls, capture caller details, and notify business owners or
        authorized staff about new leads.
      </p>

      <h2>Information we collect</h2>
      <p>
        We may collect account information such as name, email address, business
        name, business phone number, notification phone number, and notification
        email address. We may also collect lead and call information submitted
        through the service, including caller name, phone number, service
        request, call summary, transcript, call metadata, and lead status.
      </p>

      <h2>How we use information</h2>
      <p>
        We use this information to provide the LunchBreak AI service, including
        creating business accounts, capturing leads, displaying dashboard
        records, sending lead notifications, supporting billing, improving the
        product, and troubleshooting technical issues.
      </p>

      <h2>Call and lead data</h2>
      <p>
        LunchBreak AI may process call transcripts, summaries, caller phone
        numbers, and service request details so that businesses can follow up
        with prospective customers. Businesses are responsible for using caller
        information appropriately and in accordance with applicable laws.
      </p>

      <h2>SMS and email notifications</h2>
      <p>
        If a business user provides a notification phone number or email address,
        LunchBreak AI may send transactional lead alerts to that destination.
        These alerts are intended for business follow-up and are not marketing
        messages.
      </p>

      <h2>Service providers</h2>
      <p>
        We may use third-party service providers for authentication, hosting,
        payments, email delivery, SMS delivery, call handling, analytics, and
        infrastructure. These providers process information only as needed to
        support the service.
      </p>

      <h2>Payment information</h2>
      <p>
        Payments are processed by a third-party payment provider. LunchBreak AI
        does not store full payment card numbers on its own servers.
      </p>

      <h2>Data retention</h2>
      <p>
        We retain account, lead, call, and notification records for as long as
        needed to provide the service, comply with legal obligations, resolve
        disputes, and improve the product. During beta, retention practices may
        evolve as the product matures.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organizational measures to protect
        information. However, no internet-based service can be guaranteed to be
        completely secure.
      </p>

      <h2>Beta status</h2>
      <p>
        LunchBreak AI is currently in beta. Features, integrations, policies, and
        data handling practices may change as the product develops.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or data requests, contact the LunchBreak AI team at
        the email address provided in your account or beta communications.
      </p>
    </LegalPage>
  );
}
