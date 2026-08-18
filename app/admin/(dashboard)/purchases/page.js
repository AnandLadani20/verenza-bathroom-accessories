"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = {
  supplierName: "",
  description: "",
  amount: "",
  quantity: 1,
  category: "",
  date: new Date().toISOString().slice(0, 10),
  notes: "",
};

function formatCurrency(n) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0);
}

export default function PurchasesPage() {
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
      const res = await fetch("/api/admin/purchases");
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

  function openEdit(p) {
    setEditingId(p._id);
    setForm({
      supplierName: p.supplierName || "",
      description: p.description || "",
      amount: p.amount,
      quantity: p.quantity || 1,
      category: p.category || "",
      date: p.date ? new Date(p.date).toISOString().slice(0, 10) : "",
      notes: p.notes || "",
    });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/admin/purchases/${editingId}` : "/api/admin/purchases";
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
    if (!confirm("Delete this purchase record?")) return;
    try {
      const res = await fetch(`/api/admin/purchases/${id}`, { method: "DELETE" });
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
        <h1>Purchases</h1>
        <button className="admin-btn admin-btn-accent" onClick={openCreate}>
          + Add Purchase
        </button>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="label">Total Purchase Amount</div>
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
          <div className="admin-empty">No purchase records yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Supplier</th>
                <th>Description</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id}>
                  <td>{new Date(p.date).toLocaleDateString("en-IN")}</td>
                  <td>{p.supplierName}</td>
                  <td>{p.description || "-"}</td>
                  <td>{p.category || "-"}</td>
                  <td>{p.quantity}</td>
                  <td>{formatCurrency(p.amount)}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(p)}>
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(p._id)}
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
            <h2>{editingId ? "Edit Purchase" : "Add Purchase"}</h2>
            <form onSubmit={handleSave}>
              <div className="admin-form-row">
                <label className="admin-field">
                  <span>Supplier Name *</span>
                  <input
                    value={form.supplierName}
                    onChange={(e) => setForm({ ...form, supplierName: e.target.value })}
                    required
                  />
                </label>
                <label className="admin-field">
                  <span>Category</span>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
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
