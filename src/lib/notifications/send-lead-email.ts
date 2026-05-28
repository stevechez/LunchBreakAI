// src/lib/notifications/send-lead-email.ts
import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";

type SendLeadEmailInput = {
  supabase: SupabaseClient;
  businessId: string;
  leadId: string;
  callId?: string | null;
};

type LeadRecord = {
  id: string;
  caller_name: string | null;
  caller_phone: string | null;
  caller_email: string | null;
  service_needed: string | null;
  job_date: string | null;
  job_location: string | null;
  destination_location: string | null;
  summary: string | null;
  urgency: string | null;
  estimated_value: number | null;
  created_at: string;
};

type BusinessRecord = {
  id: string;
  name: string;
  notification_email: string | null;
  notification_phone: string | null;
};

export async function sendLeadEmailNotification({
  supabase,
  businessId,
  leadId,
  callId = null,
}: SendLeadEmailInput) {
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("id, name, notification_email, notification_phone")
    .eq("id", businessId)
    .single<BusinessRecord>();

  if (businessError || !business) {
    return {
      ok: false,
      error: businessError?.message ?? "Business not found",
    };
  }

  if (!business.notification_email) {
    await supabase.from("notifications").insert({
      business_id: businessId,
      lead_id: leadId,
      call_id: callId,
      channel: "email",
      recipient: "missing",
      subject: "New LunchBreak AI lead",
      body: "Notification email is not configured.",
      status: "failed",
      error_message: "Business notification_email is missing",
    });

    return {
      ok: false,
      error: "Business notification_email is missing",
    };
  }

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select(
      "id, caller_name, caller_phone, caller_email, service_needed, job_date, job_location, destination_location, summary, urgency, estimated_value, created_at"
    )
    .eq("id", leadId)
    .eq("business_id", businessId)
    .single<LeadRecord>();

  if (leadError || !lead) {
    return {
      ok: false,
      error: leadError?.message ?? "Lead not found",
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!resendApiKey || !from) {
    await supabase.from("notifications").insert({
      business_id: businessId,
      lead_id: leadId,
      call_id: callId,
      channel: "email",
      recipient: business.notification_email,
      subject: "New LunchBreak AI lead",
      body: "Resend environment variables are missing.",
      status: "failed",
      error_message: "Missing RESEND_API_KEY or LEAD_NOTIFICATION_FROM",
    });

    return {
      ok: false,
      error: "Missing RESEND_API_KEY or LEAD_NOTIFICATION_FROM",
    };
  }

  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${lead.id}`;

  const subject = `New ${lead.urgency === "emergency" ? "emergency " : ""}lead: ${
    lead.service_needed || "Service request"
  }`;

  const textBody = [
    `New lead captured by LunchBreak AI`,
    ``,
    `Business: ${business.name}`,
    `Caller: ${lead.caller_name || "Unknown"}`,
    `Phone: ${lead.caller_phone || "Not provided"}`,
    `Email: ${lead.caller_email || "Not provided"}`,
    `Service: ${lead.service_needed || "Not specified"}`,
    `Urgency: ${lead.urgency || "normal"}`,
    `Estimated value: ${
      lead.estimated_value ? `$${lead.estimated_value}` : "Not set"
    }`,
    `Job date: ${lead.job_date || "Not provided"}`,
    `Location: ${lead.job_location || "Not provided"}`,
    `Destination: ${lead.destination_location || "Not provided"}`,
    ``,
    `Summary:`,
    lead.summary || "No summary provided.",
    ``,
    `View lead: ${dashboardUrl}`,
  ].join("\n");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #0f172a;">
      <h1 style="font-size: 24px; margin-bottom: 8px;">New lead captured</h1>
      <p style="color: #475569; margin-top: 0;">LunchBreak AI answered a call and captured a new lead.</p>

      <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 24px 0;">
        <p><strong>Caller:</strong> ${escapeHtml(lead.caller_name || "Unknown")}</p>
        <p><strong>Phone:</strong> ${escapeHtml(lead.caller_phone || "Not provided")}</p>
        <p><strong>Email:</strong> ${escapeHtml(lead.caller_email || "Not provided")}</p>
        <p><strong>Service:</strong> ${escapeHtml(lead.service_needed || "Not specified")}</p>
        <p><strong>Urgency:</strong> ${escapeHtml(lead.urgency || "normal")}</p>
        <p><strong>Estimated value:</strong> ${
          lead.estimated_value ? `$${lead.estimated_value}` : "Not set"
        }</p>
        <p><strong>Job date:</strong> ${escapeHtml(lead.job_date || "Not provided")}</p>
        <p><strong>Location:</strong> ${escapeHtml(lead.job_location || "Not provided")}</p>
        <p><strong>Destination:</strong> ${escapeHtml(lead.destination_location || "Not provided")}</p>
      </div>

      <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 24px 0; background: #f8fafc;">
        <h2 style="font-size: 18px; margin-top: 0;">Summary</h2>
        <p style="line-height: 1.6;">${escapeHtml(lead.summary || "No summary provided.")}</p>
      </div>

      <a href="${dashboardUrl}" style="display: inline-block; background: #2563eb; color: white; text-decoration: none; padding: 12px 18px; border-radius: 10px; font-weight: bold;">
        View lead
      </a>
    </div>
  `;

  const resend = new Resend(resendApiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: business.notification_email,
    subject,
    text: textBody,
    html: htmlBody,
  });

  await supabase.from("notifications").insert({
    business_id: businessId,
    lead_id: leadId,
    call_id: callId,
    channel: "email",
    recipient: business.notification_email,
    subject,
    body: textBody,
    status: error ? "failed" : "sent",
    provider_message_id: data?.id ?? null,
    error_message: error?.message ?? null,
    sent_at: error ? null : new Date().toISOString(),
  });

  if (error) {
    return {
      ok: false,
      error: error.message,
    };
  }

  return {
    ok: true,
    providerMessageId: data?.id ?? null,
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
