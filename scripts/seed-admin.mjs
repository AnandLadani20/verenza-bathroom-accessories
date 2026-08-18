// Creates or updates the first admin account.
// Usage: set ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD and MONGODB_URI (in .env.local
// or the shell env), then run: npm run seed:admin
import { config } from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

config({ path: ".env.local" });

const { MONGODB_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set (add it to .env.local)");
  process.exit(1);
}
if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error("ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must all be set");
  process.exit(1);
}
if (ADMIN_PASSWORD.length < 8) {
  console.error("ADMIN_PASSWORD must be at least 8 characters");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  failedAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const email = ADMIN_EMAIL.toLowerCase().trim();

  const admin = await Admin.findOneAndUpdate(
    { email },
    { name: ADMIN_NAME, email, passwordHash, failedAttempts: 0, lockUntil: null },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  console.log(`Admin ready: ${admin.email} (${admin._id})`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
