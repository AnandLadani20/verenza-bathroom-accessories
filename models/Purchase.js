import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    supplierName: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    amount: { type: Number, required: true, min: 0 },
    quantity: { type: Number, default: 1, min: 0 },
    category: { type: String, trim: true, default: "" },
    date: { type: Date, required: true, default: Date.now },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);
