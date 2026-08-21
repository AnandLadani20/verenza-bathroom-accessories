"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "../admin.css";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/purchases", label: "Purchases" },
  { href: "/admin/sales", label: "Sales" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then((d) => setAdmin(d.admin || null))
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">Verenza Admin</div>
        <nav className="admin-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          {admin && (
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 8 }}>{admin.email}</div>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
