import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Client from "@/models/Client";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const items = await Client.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ items });
}

export async function POST(request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const name = String(body.name || "").trim();
  if (!name) return NextResponse.json({ error: "Client name is required" }, { status: 400 });

  await dbConnect();
  const client = await Client.create({
    name,
    company: String(body.company || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    address: String(body.address || "").trim(),
    notes: String(body.notes || "").trim(),
  });

  return NextResponse.json({ client }, { status: 201 });
}
