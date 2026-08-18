import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Purchase from "@/models/Purchase";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const items = await Purchase.find().sort({ date: -1 }).lean();
  const total = items.reduce((sum, p) => sum + p.amount, 0);
  return NextResponse.json({ items, total });
}

export async function POST(request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const supplierName = String(body.supplierName || "").trim();
  const amount = Number(body.amount);
  if (!supplierName) return NextResponse.json({ error: "Supplier name is required" }, { status: 400 });
  if (!Number.isFinite(amount) || amount < 0) {
    return NextResponse.json({ error: "Amount must be a valid non-negative number" }, { status: 400 });
  }

  await dbConnect();
  const purchase = await Purchase.create({
    supplierName,
    amount,
    description: String(body.description || "").trim(),
    quantity: Number(body.quantity) || 1,
    category: String(body.category || "").trim(),
    date: body.date ? new Date(body.date) : new Date(),
    notes: String(body.notes || "").trim(),
  });

  return NextResponse.json({ purchase }, { status: 201 });
}
