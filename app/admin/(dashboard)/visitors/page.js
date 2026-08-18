"use client";

import { useEffect, useState } from "react";

export default function VisitorsPage() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/visitors?page=${page}&limit=25`)
      .then((res) => res.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setItems(d.items);
        setSummary(d.summary);
        setPages(d.pages);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <div className="admin-header">
        <h1>Visitors</h1>
      </div>

      {summary && (
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="label">Total Page Views</div>
            <div className="value">{summary.total}</div>
          </div>
          <div className="admin-stat-card">
            <div className="label">Unique Visitors</div>
            <div className="value">{summary.unique}</div>
          </div>
          <div className="admin-stat-card">
            <div className="label">Views Today</div>
            <div className="value">{summary.today}</div>
          </div>
          <div className="admin-stat-card">
            <div className="label">Views This Month</div>
            <div className="value">{summary.thisMonth}</div>
          </div>
        </div>
      )}

      {error && <div className="admin-alert admin-alert-error">{error}</div>}

      <div className="admin-table-wrap">
        {loading ? (
          <div className="admin-loading">Loading...</div>
        ) : items.length === 0 ? (
          <div className="admin-empty">No visitor activity recorded yet.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Path</th>
                <th>IP</th>
                <th>Location</th>
                <th>Browser</th>
                <th>OS</th>
                <th>Device</th>
                <th>New?</th>
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v._id}>
                  <td>{new Date(v.createdAt).toLocaleString("en-IN")}</td>
                  <td>{v.path}</td>
                  <td>{v.ip || "-"}</td>
                  <td>{[v.city, v.region, v.country].filter(Boolean).join(", ") || "-"}</td>
                  <td>{v.browser || "-"}</td>
                  <td>{v.os || "-"}</td>
                  <td>{v.device || "-"}</td>
                  <td>{v.isNewVisitor ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {pages > 1 && (
        <div className="admin-toolbar" style={{ justifyContent: "center", marginTop: 16 }}>
          <button
            className="admin-btn admin-btn-outline admin-btn-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span style={{ fontSize: 14 }}>
            Page {page} of {pages}
          </span>
          <button
            className="admin-btn admin-btn-outline admin-btn-sm"
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
