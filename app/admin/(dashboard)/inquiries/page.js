"use client";

import { useEffect, useState } from "react";

export default function InquiriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  async function load() {
    setLoading(true);
    try {
      const qs = statusFilter ? `?status=${statusFilter}` : "";
      const res = await fetch(`/api/admin/inquiries${qs}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function updateStatus(id, status) {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems((prev) => prev.map((i) => (i._id === id ? { ...i, status } : i)));
      if (selected && selected._id === id) setSelected({ ...selected, status });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setItems((prev) => prev.filter((i) => i._id !== id));
      if (selected && selected._id === id) setSelected(null);
    } catch (err) {
      setError(err.message);
    }
  }

  function openView(inquiry) {
    setSelected(inquiry);
    if (inquiry.status === "new") updateStatus(inquiry._id, "read");
  }

  return (
    <div>
      <div className="admin-header">
        <h1>Inquiries</h1>
        <select
          className="admin-field"
          style={{ margin: 0, width: 180 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="responded">Responded</option>
        </select>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="admin-empty">No inquiries yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i._id}>
                  <td>{new Date(i.createdAt).toLocaleString("en-IN")}</td>
                  <td>{i.name}</td>
                  <td>{i.email}</td>
                  <td>{i.phone}</td>
                  <td>{i.subject || "-"}</td>
                  <td>
                    <span className={`admin-badge admin-badge-${i.status}`}>{i.status}</span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-btn admin-btn-outline admin-btn-sm" onClick={() => openView(i)}>
                        View
                      </button>
                      <button
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        onClick={() => handleDelete(i._id)}
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

      {selected && (
        <div className="admin-modal-overlay" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Inquiry from {selected.name}</h2>
            <p style={{ fontSize: 14, color: "var(--ink-70)", marginBottom: 6 }}>
              <strong>Email:</strong> {selected.email}
            </p>
            <p style={{ fontSize: 14, color: "var(--ink-70)", marginBottom: 6 }}>
              <strong>Phone:</strong> {selected.phone}
            </p>
            <p style={{ fontSize: 14, color: "var(--ink-70)", marginBottom: 6 }}>
              <strong>Subject:</strong> {selected.subject || "-"}
            </p>
            <p style={{ fontSize: 14, color: "var(--ink-70)", marginBottom: 14 }}>
              <strong>Received:</strong> {new Date(selected.createdAt).toLocaleString("en-IN")}
            </p>
            <div className="admin-panel" style={{ padding: 16, marginBottom: 0, whiteSpace: "pre-wrap", fontSize: 14 }}>
              {selected.message}
            </div>
            <div className="admin-modal-actions">
              <select
                className="admin-field"
                style={{ margin: 0, width: 160 }}
                value={selected.status}
                onChange={(e) => updateStatus(selected._id, e.target.value)}
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
              <button className="admin-btn admin-btn-outline" onClick={() => setSelected(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
