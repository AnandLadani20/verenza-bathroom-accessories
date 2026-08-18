import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_MAX_AGE, signAdminToken, verifyAdminToken } from "@/lib/jwt";

export { ADMIN_COOKIE_NAME, signAdminToken, verifyAdminToken };

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export async function setAdminCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
}

export async function clearAdminCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function getAdminFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifyAdminToken(token);
  if (!payload) return null;

  await dbConnect();
  const admin = await Admin.findById(payload.sub).lean();
  if (!admin) return null;
  return { id: String(admin._id), name: admin.name, email: admin.email };
}
