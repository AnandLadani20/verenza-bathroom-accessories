import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", ClientSchema);
