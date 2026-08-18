import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(request, { params }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const inquiry = await Inquiry.findById(id).lean();
  if (!inquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ inquiry });
}

export async function PATCH(request, { params }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const status = body.status;
  if (!["new", "read", "responded"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await dbConnect();
  const inquiry = await Inquiry.findByIdAndUpdate(id, { status }, { returnDocument: "after" }).lean();
  if (!inquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ inquiry });
}

export async function DELETE(request, { params }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const inquiry = await Inquiry.findByIdAndDelete(id).lean();
  if (!inquiry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
