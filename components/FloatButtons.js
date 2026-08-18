"use client";

import { useEffect, useState } from "react";

export default function FloatButtons() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShow((window.scrollY || window.pageYOffset) > 500);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTop(e) {
    e.preventDefault();
    if (window.__verenzaLenis) window.__verenzaLenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <a href="https://wa.me/919998405513" className="whatsapp-float" target="_blank" rel="noopener" aria-label="WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <a href="#" className={`scroll-top${show ? " show" : ""}`} aria-label="Scroll to top" onClick={scrollTop}>
        <i className="fa-solid fa-arrow-up"></i>
      </a>
    </>
  );
}
