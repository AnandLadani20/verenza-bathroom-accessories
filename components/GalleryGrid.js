"use client";

import { useEffect } from "react";

const ITEMS = [
  { n: 1, alt: "Verenza bathroom suite", title: "Verenza Bathroom Suite", tall: true },
  { n: 2, alt: "Verenza bathroom fittings", title: "Verenza Bathroom Fittings" },
  { n: 3, alt: "Verenza bathroom accessories", title: "Verenza Bathroom Accessories" },
  { n: 4, alt: "Verenza vanity styling", title: "Verenza Vanity Styling" },
  { n: 5, alt: "Verenza storage rack detail", title: "Verenza Storage Rack" },
  { n: 6, alt: "Verenza shower fittings", title: "Verenza Shower Fittings" },
  { n: 7, alt: "Verenza premium bathroom interior", title: "Verenza Premium Interior", tall: true },
  { n: 8, alt: "Verenza towel rack styling", title: "Verenza Towel Rack" },
  { n: 9, alt: "Verenza bathroom accessory set", title: "Verenza Accessory Set" },
  { n: 10, alt: "Verenza black edition fittings", title: "Verenza Black Edition" },
  { n: 11, alt: "Verenza bathroom detail shot", title: "Verenza Detail Shot" },
  { n: 12, alt: "Verenza mirror and vanity", title: "Verenza Mirror & Vanity", tall: true },
  { n: 13, alt: "Verenza bath hardware finish", title: "Verenza Hardware Finish" },
  { n: 14, alt: "Verenza manufacturing quality", title: "Verenza Manufacturing Quality" },
  { n: 15, alt: "Verenza accessory set styling", title: "Verenza Accessory Styling" },
  { n: 16, alt: "Verenza bathroom lifestyle", title: "Verenza Bathroom Lifestyle", tall: true },
  { n: 17, alt: "Verenza fitting close-up", title: "Verenza Fitting Close-up" },
  { n: 18, alt: "Verenza modern bathroom design", title: "Verenza Modern Design" },
  { n: 19, alt: "Verenza rack and holder set", title: "Verenza Rack & Holder Set" },
  { n: 20, alt: "Verenza round mirror vanity", title: "Verenza Round Mirror Vanity", tall: true },
  { n: 21, alt: "Verenza bathroom hardware", title: "Verenza Bathroom Hardware" },
  { n: 22, alt: "Verenza premium finish detail", title: "Verenza Premium Finish" },
  { n: 23, alt: "Verenza craftsmanship detail", title: "Verenza Craftsmanship" },
  { n: 24, alt: "Verenza complete bathroom ensemble", title: "Verenza Complete Ensemble", tall: true },
  { n: 25, alt: "Verenza bathroom accessories showcase", title: "Verenza Showcase" },
];

export default function GalleryGrid() {
  useEffect(() => {
    let lightbox;
    let cancelled = false;
    import("glightbox").then(({ default: GLightbox }) => {
      if (cancelled) return;
      lightbox = GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
    });
    return () => {
      cancelled = true;
      if (lightbox) lightbox.destroy();
    };
  }, []);

  return (
    <div className="gallery-grid">
      {ITEMS.map((item) => {
        const src = `/images/gallery/gallery${item.n}.jpg`;
        return (
          <div className={`gallery-item${item.tall ? " tall" : ""}`} key={item.n}>
            <img src={src} alt={item.alt} loading="lazy" />
            <a href={src} className="gallery-overlay glightbox" data-gallery="verenza-gallery" title={item.title}>
              <span className="icon"><i className="fa-solid fa-expand"></i></span>
            </a>
          </div>
        );
      })}
    </div>
  );
}
