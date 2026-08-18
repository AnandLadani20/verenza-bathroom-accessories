import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Sale from "@/models/Sale";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const items = await Sale.find().sort({ date: -1 }).lean();
  const total = items.reduce((sum, s) => sum + s.amount, 0);
  return NextResponse.json({ items, total });
}

export async function POST(request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const clientName = String(body.clientName || "").trim();
  const amount = Number(body.amount);
  if (!clientName) return NextResponse.json({ error: "Client name is required" }, { status: 400 });
  if (!Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ error: "Amount must be a valid non-negative number" }, { status: 400 });
  }

  await dbConnect();
  const sale = await Sale.create({
    clientName,
    amount,
    description: String(body.description || "").trim(),
    quantity: Number(body.quantity) || 1,
    date: body.date ? new Date(body.date) : new Date(),
    status: body.status === "pending" ? "pending" : "paid",
    notes: String(body.notes || "").trim(),
  });

  return NextResponse.json({ sale }, { status: 201 });
}
