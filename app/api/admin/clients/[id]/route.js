import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Client from "@/models/Client";
import { getAdminFromCookies } from "@/lib/auth";

export async function PATCH(request, { params }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const update = {};
  for (const field of ["name", "company", "email", "phone", "address", "notes"]) {
    if (body[field] !== undefined) update[field] = String(body[field]).trim();
  }
  if (update.name === "") return NextResponse.json({ error: "Client name is required" }, { status: 400 });

  await dbConnect();
  const client = await Client.findByIdAndUpdate(id, update, { returnDocument: "after" }).lean();
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ client });
}

export async function DELETE(request, { params }) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const client = await Client.findByIdAndDelete(id).lean();
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
