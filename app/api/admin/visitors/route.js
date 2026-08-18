import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Visitor from "@/models/Visitor";
import { getAdminFromCookies } from "@/lib/auth";

export async function GET(request) {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "25", 10)));

  await dbConnect();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [items, total, uniqueIds, today, thisMonth] = await Promise.all([
    Visitor.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Visitor.countDocuments(),
    Visitor.distinct("visitorId"),
    Visitor.countDocuments({ createdAt: { $gte: startOfToday } }),
    Visitor.countDocuments({ createdAt: { $gte: startOfMonth } }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit) || 1,
    summary: { total, unique: uniqueIds.length, today, thisMonth },
  });
}
