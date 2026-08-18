"use client";

import { useEffect, useState } from "react";

function formatCurrency(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
}

function monthLabel(ym) {
  if (!ym) return "-";
  const [y, m] = ym.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setData(d);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="admin-alert admin-alert-error">{error}</div>;
  if (!data) return <div className="admin-loading">Loading dashboard...</div>;

  const { inquiries, clients, visitors, finance, monthly } = data;

  return (
    <div>
      <div className="admin-header">
        <h1>Dashboard</h1>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="label">Total Inquiries</div>
          <div className="value">{inquiries.total}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">New Inquiries</div>
          <div className="value">{inquiries.new}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Total Clients</div>
          <div className="value">{clients.total}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Total Visitors</div>
          <div className="value">{visitors.total}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Unique Visitors</div>
          <div className="value">{visitors.unique}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Visitors Today</div>
          <div className="value">{visitors.today}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Total Purchase Amount</div>
          <div className="value">{formatCurrency(finance.totalPurchaseAmount)}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Total Sales Amount</div>
          <div className="value">{formatCurrency(finance.totalSaleAmount)}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Profit / Loss</div>
          <div className={`value ${finance.profitLoss >= 0 ? "positive" : "negative"}`}>
            {formatCurrency(finance.profitLoss)}
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Total Transactions</div>
          <div className="value">{finance.totalTransactions}</div>
        </div>
      </div>

      <div className="admin-panel">
        <h2>Monthly Purchase / Sales Summary</h2>
        <div className="admin-table-wrap">
          {monthly.length === 0 ? (
            <div className="admin-empty">No purchase or sales records yet.</div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Purchases</th>
                  <th>Sales</th>
                  <th>Profit / Loss</th>
                </tr>
              </thead>
              <tbody>
                {monthly.map((m) => (
                  <tr key={m.month}>
                    <td>{monthLabel(m.month)}</td>
                    <td>{formatCurrency(m.purchases)}</td>
                    <td>{formatCurrency(m.sales)}</td>
                    <td style={{ color: m.profitLoss >= 0 ? "#2f7d4f" : "#b0392c" }}>
                      {formatCurrency(m.profitLoss)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
