import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
  const status = searchParams.get("status");

  await dbConnect();
  const filter = status ? { status } : {};

  const [items, total] = await Promise.all([
    Inquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Inquiry.countDocuments(filter),
  ]);

  return NextResponse.json({ items, total, page, limit, pages: Math.ceil(total / limit) || 1 });
}
