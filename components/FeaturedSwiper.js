"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Swiper from "swiper/bundle";

export default function FeaturedSwiper({ products }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || el.swiper) return;
    const instance = new Swiper(el, {
      slidesPerView: 1.15,
      spaceBetween: 24,
      observer: true,
      observeParents: true,
      navigation: { nextEl: ".strip-next", prevEl: ".strip-prev" },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 24 },
        992: { slidesPerView: 3, spaceBetween: 30 },
        1300: { slidesPerView: 4, spaceBetween: 32 },
      },
    });
    return () => {
      if (!instance.destroyed) instance.destroy(true, true);
    };
  }, []);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "30px", flexWrap: "wrap", marginBottom: "44px" }}>
        <div>
          <span className="tag">Featured</span>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Best-selling steel essentials</h2>
        </div>
        <div className="strip-nav">
          <button className="snav strip-prev" aria-label="Previous"><i className="fa-solid fa-arrow-left"></i></button>
          <button className="snav strip-next" aria-label="Next"><i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
      <div className="swiper strip-swiper" ref={rootRef}>
        <div className="swiper-wrapper">
          {products.map((p) => (
            <div className="swiper-slide" key={p.id}>
              <Link className="feat-card" href={`/products/${p.id}`}>
                <div className="thumb">
                  <img src={p.image} alt={`${p.name} - ${p.label} | Verenza`} loading="lazy" />
                  <span className="zoom"><i className="fa-solid fa-arrow-up-right"></i></span>
                </div>
                <div className="info">
                  <h4>{p.name}</h4>
                  <span className="code">{p.series}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
