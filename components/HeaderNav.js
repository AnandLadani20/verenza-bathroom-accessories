"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", key: "home", short: "Home", full: "Home", preview: "/products/RE-201.jpg" },
  { href: "/about", key: "about", short: "About", full: "About Us", preview: "/products/CA-405.jpg" },
  { href: "/products", key: "products", short: "Products", full: "Products", preview: "/products/KV-104.jpg" },
  { href: "/gallery", key: "gallery", short: "Gallery", full: "Gallery", preview: "/products/BR-305.jpg" },
  { href: "/catalogue", key: "catalogue", short: "Catalogue", full: "Catalogue", preview: "/products/510.jpg" },
  { href: "/contact", key: "contact", short: "Contact", full: "Contact Us", preview: "/products/CA-401.jpg" },
];

function currentKey(pathname) {
  if (pathname === "/") return "home";
  const seg = pathname.split("/")[1];
  return NAV_ITEMS.some((n) => n.key === seg) ? seg : "home";
}

export default function HeaderNav() {
  const pathname = usePathname();
  const activeKey = currentKey(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState(activeKey);
  const year = new Date().getFullYear();

  useEffect(() => {
    setPreviewKey(activeKey);
  }, [activeKey]);

  useEffect(() => {
    function handleScroll() {
      setScrolled((window.scrollY || window.pageYOffset) > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
  }, [navOpen]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setNavOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className={`site-header header--overlay${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <Link href="/" className="logo">
            <img src="/images/logo/verenzabath.png" alt="Verenza logo" className="logo-dark" />
            <img src="/images/logo/verenzabathWhite.png" alt="Verenza white logo" className="logo-white" />
          </Link>
          <div className="header-right">
            <nav className="main-nav-inline">
              {NAV_ITEMS.map((item) => (
                <Link key={item.key} href={item.href} className={item.key === activeKey ? "active" : ""}>
                  {item.short}
                </Link>
              ))}
            </nav>
            <Link href="/contact" className="header-quote">Get a Quote</Link>
            <button className="menu-trigger" aria-label="Open menu" onClick={() => setNavOpen((v) => !v)}>
              <span className="bars"><span></span><span></span><span></span></span>
              Menu
            </button>
          </div>
        </div>
      </header>

      <div className="nav-overlay" id="navOverlay">
        <button className="nav-close" aria-label="Close menu" onClick={() => setNavOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="nav-overlay-inner">
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onMouseEnter={() => setPreviewKey(item.key)}
                  onClick={() => setNavOpen(false)}
                >
                  {item.full}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-overlay-media">
            {NAV_ITEMS.map((item) => (
              <img
                key={item.key}
                src={item.preview}
                className={`nav-preview${item.key === previewKey ? " is-active" : ""}`}
                alt=""
              />
            ))}
          </div>
        </div>
        <div className="nav-overlay-foot">
          <span>&copy; {year} Verenza Enterprise</span>
          <div className="socials">
            <a href="https://www.facebook.com/share/1EPrY4BtqT/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" onClick={() => setNavOpen(false)}><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/verenzaenterprise?igsh=d2J3NWhkNzEwaHM0&igsi=d2J3NWhkNzEwaHM0" target="_blank" rel="noopener noreferrer" aria-label="Instagram" onClick={() => setNavOpen(false)}><i className="fa-brands fa-instagram"></i></a>
            <a href="https://www.youtube.com/@verenzaenterprise" target="_blank" rel="noopener noreferrer" aria-label="YouTube" onClick={() => setNavOpen(false)}><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
    </>
  );
}
