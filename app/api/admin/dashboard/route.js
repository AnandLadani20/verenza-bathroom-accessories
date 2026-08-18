import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import Client from "@/models/Client";
import Purchase from "@/models/Purchase";
import Sale from "@/models/Sale";
import Visitor from "@/models/Visitor";
import { getAdminFromCookies } from "@/lib/auth";

function monthlyTotals(model, amountField = "amount") {
  return model.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
        total: { $sum: `$${amountField}` },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 12 },
  ]);
}

export async function GET() {
  const admin = await getAdminFromCookies();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [
    totalInquiries,
    newInquiries,
    totalClients,
    purchaseAgg,
    saleAgg,
    totalVisitors,
    uniqueVisitorIds,
    visitorsToday,
    visitorsThisMonth,
    purchaseMonthly,
    saleMonthly,
  ] = await Promise.all([
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: "new" }),
    Client.countDocuments(),
    Purchase.aggregate([{ $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }]),
    Sale.aggregate([{ $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } }]),
    Visitor.countDocuments(),
    Visitor.distinct("visitorId"),
    Visitor.countDocuments({ createdAt: { $gte: startOfToday } }),
    Visitor.countDocuments({ createdAt: { $gte: startOfMonth } }),
    monthlyTotals(Purchase),
    monthlyTotals(Sale),
  ]);

  const totalPurchaseAmount = purchaseAgg[0]?.total || 0;
  const totalSaleAmount = saleAgg[0]?.total || 0;
  const totalPurchaseCount = purchaseAgg[0]?.count || 0;
  const totalSaleCount = saleAgg[0]?.count || 0;

  const monthMap = new Map();
  for (const row of purchaseMonthly) {
    monthMap.set(row._id, { month: row._id, purchases: row.total, sales: 0 });
  }
  for (const row of saleMonthly) {
    const existing = monthMap.get(row._id) || { month: row._id, purchases: 0, sales: 0 };
    existing.sales = row.total;
    monthMap.set(row._id, existing);
  }
  const monthly = Array.from(monthMap.values())
    .sort((a, b) => (a.month < b.month ? 1 : -1))
    .slice(0, 12)
    .map((m) => ({ ...m, profitLoss: m.sales - m.purchases }));

  return NextResponse.json({
    inquiries: { total: totalInquiries, new: newInquiries },
    clients: { total: totalClients },
    visitors: {
      total: totalVisitors,
      unique: uniqueVisitorIds.length,
      today: visitorsToday,
      thisMonth: visitorsThisMonth,
    },
    finance: {
      totalPurchaseAmount,
      totalSaleAmount,
      profitLoss: totalSaleAmount - totalPurchaseAmount,
      totalTransactions: totalPurchaseCount + totalSaleCount,
    },
    monthly,
  });
}
