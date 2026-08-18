import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { sendInquiryNotification } from "@/lib/email";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const subject = String(body.subject || "").trim();
  const message = String(body.message || "").trim();

  if (!name || !phone || !email || !message) {
    return NextResponse.json({ error: "Name, phone, email and message are required" }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address" }, { status: 400 });
  }

  try {
    await dbConnect();
    const inquiry = await Inquiry.create({ name, phone, email, subject, message });

    await sendInquiryNotification(inquiry);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Failed to save inquiry:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
