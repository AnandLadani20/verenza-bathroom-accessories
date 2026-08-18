import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    amount: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 1, min: 0 },
    date: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: ["paid", "pending"], default: "paid" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
