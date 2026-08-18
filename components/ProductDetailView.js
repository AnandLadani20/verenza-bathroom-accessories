"use client";

import { useState } from "react";
import Link from "next/link";
import MagneticButton from "./motion/MagneticButton";

export default function ProductDetailView({ product, related }) {
  const gallery =
    product.finishImages && product.finishImages.length
      ? product.finishImages
      : (product.images || [product.image]).map((img) => ({ image: img, finish: null }));

  const [activeIdx, setActiveIdx] = useState(0);
  const mainImage = gallery[activeIdx]?.image || product.image;

  const whatsappHref =
    "https://wa.me/919998405513?text=" +
    encodeURIComponent(`Hi, I'm interested in ${product.name} (Series ${product.series})`);

  const specs = product.specifications || {};

  return (
    <>
      <section className="section" style={{ padding: "150px 0 0" }}>
        <div className="container">
          <div className="breadcrumb-row" style={{ justifyContent: "flex-start", color: "var(--ink-50)" }}>
            <Link href="/">Home</Link><span className="sep">/</span>
            <Link href="/products">Products</Link><span className="sep">/</span>
            <span>{product.name}</span>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "24px" }}>
        <div className="container">
          <div className="grid-12" style={{ alignItems: "start" }}>
            <div className="g-span-7">
              <div className="pd-main-image">
                <img src={mainImage} alt={product.name} className="is-loaded" />
              </div>
              {gallery.length > 1 && (
                <div className="pd-thumbs">
                  {gallery.map((im, i) => {
                    const label = im.finish || `View ${i + 1}`;
                    return (
                      <div className="pd-thumb-wrap" key={i}>
                        <div
                          className={`pd-thumb-item${i === activeIdx ? " is-active" : ""}`}
                          onClick={() => setActiveIdx(i)}
                        >
                          <img src={im.image} alt={`${product.name} - ${label}`} loading="lazy" />
                        </div>
                        <div className="pd-thumb-label">{label}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="g-span-5">
              <span className="tag pd-collection-tag">{product.collection} Collection</span>
              <h1 className="display-2">{product.name}</h1>
              <div className="pd-series">Series {product.series} &middot; {product.material} &middot; {product.finish}</div>
              <div className="pd-price">{product.price}</div>
              <p className="pd-description">{product.description}</p>
              <ul className="pd-features">
                {(product.features || []).map((f, i) => (
                  <li key={i}><i className="fa-solid fa-circle-check"></i>{f}</li>
                ))}
              </ul>
              <div className="btn-row">
                <MagneticButton href={whatsappHref} className="btn-fill" target="_blank" rel="noopener">
                  <span><i className="fa-brands fa-whatsapp"></i>&nbsp; Enquire Now</span>
                </MagneticButton>
                <MagneticButton href="/pdf/verenza-full-catalog.pdf" className="btn-outline-editorial" download>
                  <i className="fa-solid fa-file-pdf"></i>&nbsp; Catalogue
                </MagneticButton>
              </div>
              <div className="pd-specs">
                {Object.keys(specs).map((key) => (
                  <div className="pd-spec-row" key={key}>
                    <span className="k">{key}</span>
                    <span className="v">{specs[key]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-deep">
          <div className="container">
            <span className="tag">You May Also Like</span>
            <h2 className="section-title">More from {product.collection} collection</h2>
            <div className="product-grid" style={{ marginTop: "40px" }}>
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="product-card">
                  <div className="product-thumb">
                    <span className="p-tag">{p.label}</span>
                    <img src={p.image} alt={p.name} loading="lazy" />
                  </div>
                  <div className="product-info">
                    <h3>{p.name}</h3>
                    <span className="code">Series {p.series}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
