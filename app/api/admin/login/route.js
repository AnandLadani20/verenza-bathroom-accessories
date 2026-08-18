import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { verifyPassword, signAdminToken, setAdminCookie } from "@/lib/auth";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  await dbConnect();
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  if (admin.lockUntil && admin.lockUntil > new Date()) {
    const minutes = Math.ceil((admin.lockUntil.getTime() - Date.now()) / 60000);
    return NextResponse.json(
      { error: `Too many failed attempts. Try again in ${minutes} minute(s).` },
      { status: 423 }
    );
  }

  const valid = await verifyPassword(password, admin.passwordHash);
  if (!valid) {
    admin.failedAttempts = (admin.failedAttempts || 0) + 1;
    if (admin.failedAttempts >= MAX_ATTEMPTS) {
      admin.lockUntil = new Date(Date.now() + LOCK_MS);
      admin.failedAttempts = 0;
    }
    await admin.save();
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  admin.failedAttempts = 0;
  admin.lockUntil = null;
  await admin.save();

  const token = signAdminToken(admin);
  await setAdminCookie(token);

  return NextResponse.json({ success: true, admin: { name: admin.name, email: admin.email } });
}
