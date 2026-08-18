import { NextResponse } from "next/server";
import { getClientIp, logVisit } from "@/lib/visitor";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { path, visitorId, isNewVisitor } = body;
  if (!path || !visitorId) {
    return NextResponse.json({ error: "path and visitorId are required" }, { status: 400 });
  }

  const ip = getClientIp(request);
  const userAgent = request.headers.get("user-agent") || "";
  const referrer = request.headers.get("referer") || "";

  await logVisit({ ip, path, referrer, userAgent, visitorId, isNewVisitor: !!isNewVisitor });

  return NextResponse.json({ success: true });
}
