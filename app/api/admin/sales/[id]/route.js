import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Sale from "@/models/Sale";
import { getAdminFromCookies } from "@/lib/auth";

export async function PATCH(request, { params }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const update = {};
  if (body.clientName !== undefined) update.clientName = String(body.clientName).trim();
  if (body.description !== undefined) update.description = String(body.description).trim();
  if (body.notes !== undefined) update.notes = String(body.notes).trim();
  if (body.quantity !== undefined) update.quantity = Number(body.quantity) || 1;
  if (body.date !== undefined) update.date = new Date(body.date);
  if (body.status !== undefined) update.status = body.status === "pending" ? "pending" : "paid";
  if (body.amount !== undefined) {
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount < 0) {
      return NextResponse.json({ error: "Amount must be a valid non-negative number" }, { status: 400 });
    }
    update.amount = amount;
  }
  if (update.clientName === "") {
    return NextResponse.json({ error: "Client name is required" }, { status: 400 });
  }

  await dbConnect();
  const sale = await Sale.findByIdAndUpdate(id, update, { returnDocument: "after" }).lean();
  if (!sale) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ sale });
}

export async function DELETE(request, { params }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const sale = await Sale.findByIdAndDelete(id).lean();
  if (!sale) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
