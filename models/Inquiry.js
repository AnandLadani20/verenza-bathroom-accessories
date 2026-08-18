import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, trim: true, default: "" },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ["new", "read", "responded"], default: "new" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
