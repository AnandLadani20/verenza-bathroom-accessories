import mongoose from "mongoose";

const VisitorSchema = new mongoose.Schema({
  visitorId: { type: String, required: true, index: true },
  ip: { type: String, default: "" },
  path: { type: String, required: true },
  referrer: { type: String, default: "" },
  country: { type: String, default: "" },
  region: { type: String, default: "" },
  city: { type: String, default: "" },
  browser: { type: String, default: "" },
  os: { type: String, default: "" },
  device: { type: String, default: "desktop" },
  isNewVisitor: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: true },
});

export default mongoose.models.Visitor || mongoose.model("Visitor", VisitorSchema);
