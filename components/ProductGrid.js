"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TABS = [
  { key: "all", label: "All Products" },
  { key: "vertex", label: "Vertex", collection: "Vertex" },
  { key: "oval", label: "Oval", collection: "Oval" },
  { key: "orbit", label: "Orbit", collection: "Orbit" },
  { key: "grace", label: "Grace", collection: "Grace" },
  { key: "prime", label: "Prime", collection: "Prime" },
  { key: "soap-dispenser", label: "Soap Dispenser", category: "Soap Dispenser" },
];

export default function ProductGrid({ products }) {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && TABS.some((t) => t.key === hash)) setFilter(hash);
  }, []);

  const activeTab = TABS.find((t) => t.key === filter);

  const displayProducts =
    filter === "soap-dispenser"
      ? [...products].sort((a, b) => {
          const aTop = a.series.startsWith("6") ? 0 : 1;
          const bTop = b.series.startsWith("6") ? 0 : 1;
          return aTop - bTop;
        })
      : products;

  return (
    <>
      <div className="filter-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={filter === t.key ? "active" : ""}
            onClick={() => setFilter(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="product-grid">
        {displayProducts.map((p) => {
          const hidden =
            filter !== "all" &&
            (activeTab.collection ? p.collection !== activeTab.collection : p.category !== activeTab.category);
          return (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className={`product-card filterable-item${hidden ? " is-hidden" : ""}`}
            >
              <div className="product-thumb">
                <span className="p-tag">{p.series} series</span>
                <img src={p.image} alt={`${p.name} - ${p.label} | Verenza`} loading="lazy" />
              </div>
              <div className="product-info">
                <h3>{p.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
