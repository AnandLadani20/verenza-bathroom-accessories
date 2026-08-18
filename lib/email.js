import { Resend } from "resend";

let resendClient = null;
function getClient() {
  if (!resendClient) {
    if (!process.env.RESEND_API_KEY) return null;
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export async function sendInquiryNotification(inquiry) {
  try {
    const client = getClient();
    const to = process.env.CONTACT_NOTIFICATION_EMAIL;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!client || !to || !from) {
      console.warn("Email not sent: RESEND_API_KEY, RESEND_FROM_EMAIL or CONTACT_NOTIFICATION_EMAIL missing");
      return;
    }

    await client.emails.send({
      from,
      to,
      subject: `New inquiry: ${inquiry.subject || "Website contact form"}`,
      html: `
        <h2>New contact inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(inquiry.phone)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(inquiry.subject || "-")}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br/>")}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send inquiry notification email:", err);
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
