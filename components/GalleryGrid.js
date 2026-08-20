"use client";

import { useEffect } from "react";

const ITEMS = [
  { n: 1, alt: "Verenza bathroom suite", title: "Verenza Bathroom Suite" },
  { n: 2, alt: "Verenza bathroom fittings", title: "Verenza Bathroom Fittings" },
  { n: 3, alt: "Verenza bathroom accessories", title: "Verenza Bathroom Accessories" },
  { n: 5, alt: "Verenza storage rack detail", title: "Verenza Storage Rack" },
  { n: 6, alt: "Verenza shower fittings", title: "Verenza Shower Fittings" },
  { n: 7, alt: "Verenza premium bathroom interior", title: "Verenza Premium Interior", ext: "png" },
  { n: 8, alt: "Verenza towel rack styling", title: "Verenza Towel Rack" },
  { n: 9, alt: "Verenza bathroom accessory set", title: "Verenza Accessory Set" },
  { n: 10, alt: "Verenza black edition fittings", title: "Verenza Black Edition" },
  { n: 11, alt: "Verenza bathroom detail shot", title: "Verenza Detail Shot" },
  { n: 12, alt: "Verenza mirror and vanity", title: "Verenza Mirror & Vanity" },
  { n: 13, alt: "Verenza bath hardware finish", title: "Verenza Hardware Finish" },
  { n: 14, alt: "Verenza manufacturing quality", title: "Verenza Manufacturing Quality", ext: "png" },
  { n: 15, alt: "Verenza accessory set styling", title: "Verenza Accessory Styling", ext: "png" },
  { n: 16, alt: "Verenza bathroom lifestyle", title: "Verenza Bathroom Lifestyle", ext: "png" },
  { n: 17, alt: "Verenza fitting close-up", title: "Verenza Fitting Close-up" },
  { n: 22, alt: "Verenza premium finish detail", title: "Verenza Premium Finish" },
  { n: 28, alt: "Verenza backlit mirror with bath fittings", title: "Verenza Mirror & Fittings" },
  { n: 29, alt: "Verenza soap and toothbrush holder set", title: "Verenza Accessory Holder Set" },
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
        const src = `/images/gallery/gallery${item.n}.${item.ext || "jpg"}`;
        return (
          <div className="gallery-item" key={item.n}>
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
