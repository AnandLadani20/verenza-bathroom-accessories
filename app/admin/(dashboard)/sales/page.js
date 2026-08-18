"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = {
  clientName: "",
  description: "",
  amount: "",
  quantity: 1,
  date: new Date().toISOString().slice(0, 10),
  status: "paid",
  notes: "",
};

function formatCurrency(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
}

export default function SalesPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sales");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(s) {
    setEditingId(s._id);
    setForm({
      clientName: s.clientName || "",
      description: s.description || "",
      amount: s.amount,
      quantity: s.quantity || 1,
      date: s.date ? new Date(s.date).toISOString().slice(0, 10) : "",
      status: s.status || "paid",
      notes: s.notes || "",
    });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/admin/sales/${editingId}` : "/api/admin/sales";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this sale record?")) return;
    try {
      const res = await fetch(`/api/admin/sales/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Sales</h1>
        <button className="admin-btn admin-btn-accent" onClick={openCreate}>
          + Add Sale
        </button>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="label">Total Sales Amount</div>
          <div className="value">{formatCurrency(total)}</div>
        </div>
        <div className="admin-stat-card">
          <div className="label">Total Transactions</div>
          <div className="value">{items.length}</div>
        </div>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="admin-empty">No sales records yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s._id}>
                  <td>{new Date(s.date).toLocaleDateString("en-IN")}</td>
                  <td>{s.clientName}</td>
                  <td>{s.description || "-"}</td>
                  <td>{s.quantity}</td>
                  <td>{formatCurrency(s.amount)}</td>
                  <td>
                    <span className={`admin-badge admin-badge-${s.status}`}>{s.status}</span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(s)}>
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(s._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="admin-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingId ? "Edit Sale" : "Add Sale"}</h2>
            <form onSubmit={handleSave}>
              <div className="admin-form-row">
                <label className="admin-field">
                  <span>Client Name *</span>
                  <input
                    value={form.clientName}
                    onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                    required
                  />
                </label>
                <label className="admin-field">
                  <span>Status</span>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                </label>
              </div>
              <label className="admin-field">
                <span>Description</span>
                <input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </label>
              <div className="admin-form-row">
                <label className="admin-field">
                  <span>Amount (INR) *</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    required
                  />
                </label>
                <label className="admin-field">
                  <span>Quantity</span>
                  <input
                    type="number"
                    min="0"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  />
                </label>
                <label className="admin-field">
                  <span>Date</span>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </label>
              </div>
              <label className="admin-field">
                <span>Notes</span>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </label>
              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-accent" disabled={saving}>
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
