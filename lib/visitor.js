import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import { dbConnect } from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "";
}

export async function logVisit({ ip, path, referrer, userAgent, visitorId, isNewVisitor }) {
  try {
    const parsed = new UAParser(userAgent || "").getResult();
    const geo = ip ? geoip.lookup(ip) : null;

    await dbConnect();
    await Visitor.create({
      visitorId,
      ip,
      path,
      referrer,
      country: geo?.country || "",
      region: geo?.region || "",
      city: geo?.city || "",
      browser: parsed.browser.name || "",
      os: parsed.os.name || "",
      device: parsed.device.type || "desktop",
      isNewVisitor,
    });
  } catch (err) {
    console.error("Failed to log visitor:", err);
  }
}
