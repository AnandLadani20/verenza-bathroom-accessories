"use client";

import { useEffect, useState } from "react";

const EMPTY_FORM = { name: "", company: "", email: "", phone: "", address: "", notes: "" };

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clients");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClients(data.items);
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

  function openEdit(client) {
    setEditingId(client._id);
    setForm({
      name: client.name || "",
      company: client.company || "",
      email: client.email || "",
      phone: client.phone || "",
      address: client.address || "",
      notes: client.notes || "",
    });
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/admin/clients/${editingId}` : "/api/admin/clients";
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
    if (!confirm("Delete this client? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setClients((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Clients</h1>
        <button className="admin-btn admin-btn-accent" onClick={openCreate}>
          + Add Client
        </button>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : clients.length === 0 ? (
          <div className="admin-empty">No clients yet. Add your first client.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.company || "-"}</td>
                  <td>{c.email || "-"}</td>
                  <td>{c.phone || "-"}</td>
                  <td>{c.address || "-"}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openEdit(c)}>
                        Edit
                      </button>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(c._id)}
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
            <h2>{editingId ? "Edit Client" : "Add Client"}</h2>
            <form onSubmit={handleSave}>
              <label className="admin-field">
                <span>Name *</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <div className="admin-form-row">
                <label className="admin-field">
                  <span>Company</span>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </label>
                <label className="admin-field">
                  <span>Phone</span>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </label>
              </div>
              <label className="admin-field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label className="admin-field">
                <span>Address</span>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </label>
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
