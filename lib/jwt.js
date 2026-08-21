// Pure JWT helpers with no Node-native/DB dependencies, safe to import from proxy.js
// (its Turbopack bundle can't resolve mongoose's driver internals).
import jwt from "jsonwebtoken";

export const ADMIN_COOKIE_NAME = "vz_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const TOKEN_TTL = "7d";

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET environment variable is not set");
  return secret;
}

export function signAdminToken(admin) {
  return jwt.sign({ sub: String(admin._id), email: admin.email, name: admin.name }, getSecret(), {
    expiresIn: TOKEN_TTL,
  });
}

export function verifyAdminToken(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch {
    return null;
  }
}
