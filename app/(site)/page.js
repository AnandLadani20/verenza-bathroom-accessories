import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import FeaturedSwiper from "@/components/FeaturedSwiper";
import StatsBand from "@/components/StatsBand";
import Reveal from "@/components/motion/Reveal";
import RevealScale from "@/components/motion/RevealScale";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import MagneticButton from "@/components/motion/MagneticButton";
import { getFeaturedProducts, getCategoryMeta } from "@/lib/products";

export const metadata = {
  title: "Verenza | Premium Stainless Steel Bathroom Accessories",
  description:
    "Verenza designs and manufactures premium stainless steel bathroom accessories — towel rings, racks, shelves and kitchen organizers crafted for modern homes.",
  alternates: { canonical: "https://www.verenza.com/" },
};

const HERO_SLIDES = [
  {
    img: "/images/gallery/gallery10.jpg",
    alt: "Chrome towel rack in a premium bathroom suite",
    tag: "Lifestyle Collection",
    title: "Complete bathroom stories, beautifully finished",
  },
  {
    img: "/images/gallery/gallery1.jpg",
    alt: "Two-tier chrome storage rack beside a vanity mirror",
    tag: "Storage & Style",
    title: "Designed to complement every vanity",
  },
  {
    img: "/images/gallery/gallery5.jpg",
    alt: "Matte black swivel towel rack in a modern bathroom",
    tag: "Black Edition",
    title: "Modern finishes for modern homes",
  },
  {
    img: "/images/gallery/gallery29.jpg",
    alt: "Wall-mounted soap and toothbrush holder set",
    tag: "Accessory Sets",
    title: "Small details, exceptional craft",
  },
  {
    img: "/images/gallery/gallery28.jpg",
    alt: "Round backlit mirror with matching bath fittings",
    tag: "Complete Ensembles",
    title: "Every fixture, perfectly placed",
  },
];

const CATEGORIES = [
  { href: "/products#prime", count: "23 Designs", img: "/products/515.jpg", alt: "Prime Series", title: "Prime", feature: true },
  { href: "/products#vertex", count: "8 Designs", img: "/products/KV-102.jpg", alt: "Vertex Series", title: "Vertex" },
  { href: "/products#oval", count: "8 Designs", img: "/products/RE-202.jpg", alt: "Oval Series", title: "Oval" },
  { href: "/products#orbit", count: "9 Designs", img: "/products/BR-302.jpg", alt: "Orbit Series", title: "Orbit" },
  { href: "/products#grace", count: "8 Designs", img: "/products/CA-402.jpg", alt: "Grace Series", title: "Grace" },
  { href: "/products#soap-dispenser", count: "4 Designs", img: "/products/6001.jpg", alt: "Soap Dispenser", title: "Soap Dispenser" },
];

const MOSAIC = [
  { img: "/products/KV-104.jpg", alt: "Towel Rings", cap: "Towel Rings", tall: true },
  { img: "/products/RE-209.jpg", alt: "Towel Hangers", cap: "Towel Hangers" },
  { img: "/products/513-RG.jpg", alt: "Corner Shelves", cap: "Corner Shelves" },
  { img: "/products/525.jpg", alt: "Premium Rings", cap: "Premium Rings", tall: true },
  { img: "/products/517.jpg", alt: "Bath Racks", cap: "Bath Racks" },
  { img: "/products/CA-408.jpg", alt: "Kitchen Organizers", cap: "Kitchen Organizers" },
];

export default function HomePage() {
  const featured = getFeaturedProducts().map((p) => ({
    ...p,
    label: getCategoryMeta(p.catCode).label,
  }));

  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />

      {/* ===================== INTRO / ABOUT INDEX ===================== */}
      <section className="section">
        <div className="container">
          <div className="split-editorial">
            <div className="g-start-1">
              <span className="tag">About Verenza</span>
            </div>
            <Reveal as="p" className="lede">Verenza brings <em>precision engineering</em> to every bathroom — blending 202 & 304-grade stainless steel with a design language built for modern living.</Reveal>
            <Reveal as="div" className="side">
              <p className="body-sub">We blend modern aesthetics with industrial-grade durability, bringing premium quality into everyday spaces across India.</p>
              <Link href="/about" className="btn-line" style={{ marginTop: "22px" }}>Our Story <i className="fa-solid fa-arrow-right"></i></Link>
            </Reveal>
          </div>
          <RevealScale className="offset-media">
            <div className="offset-media-frame">
              <img src="/images/gallery/gallery1.jpg" alt="Verenza stainless steel craftsmanship" />
            </div>
          </RevealScale>
        </div>
      </section>

      {/* ===================== CATEGORY BENTO ===================== */}
      <section className="section bg-deep">
        <div className="container">
          <span className="tag">Collections</span>
          <Reveal as="h2" className="section-title" style={{ maxWidth: "640px" }}>Shop by category</Reveal>
          <Stagger className="cat-bento" style={{ marginTop: "50px" }}>
            {CATEGORIES.map((c) => (
              <StaggerItem key={c.href} href={c.href} className={`cat-card${c.feature ? " is-feature" : ""}`}>
                <span className="cat-card-count">{c.count}</span>
                <img src={c.img} alt={c.alt} loading="lazy" />
                <div className="cat-card-body">
                  <h3>{c.title} Series</h3>
                  <span className="cat-arrow"><i className="fa-solid fa-arrow-right"></i></span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== FEATURED PRODUCTS ===================== */}
      <section className="section">
        <div className="container">
          <FeaturedSwiper products={featured} />
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section className="section bg-deep">
        <div className="container">
          <span className="tag">Craftsmanship</span>
          <Reveal as="h2" className="section-title" style={{ maxWidth: "600px" }}>How we craft every piece</Reveal>
          <Reveal as="p" className="body-sub">Every Verenza product moves through a careful four-stage journey — from raw stainless steel to a flawless, ready-to-install finish.</Reveal>
          <Stagger className="process-row" style={{ marginTop: "50px" }}>
            <StaggerItem className="process-col"><span className="pnum">01</span><h4>Material Selection</h4><p>304-grade stainless steel sheets and rods chosen for strength and shine.</p></StaggerItem>
            <StaggerItem className="process-col"><span className="pnum">02</span><h4>Design &amp; Cutting</h4><p>Precision CNC laser cutting and bending bring each design to life.</p></StaggerItem>
            <StaggerItem className="process-col"><span className="pnum">03</span><h4>Mirror Polishing</h4><p>Multi-stage buffing delivers a brilliant, long-lasting mirror finish.</p></StaggerItem>
            <StaggerItem className="process-col"><span className="pnum">04</span><h4>Quality &amp; Packing</h4><p>Every batch is inspected and securely packed before dispatch.</p></StaggerItem>
          </Stagger>
        </div>
      </section>

      <StatsBand bgImage="/images/gallery/gallery14.jpg" bgAlt="Verenza stainless steel manufacturing" tag="By The Numbers" />

      {/* ===================== GALLERY PREVIEW ===================== */}
      <section className="section">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "30px", flexWrap: "wrap", marginBottom: "44px" }}>
            <div>
              <span className="tag">Showcase</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>A closer look at our craft</h2>
            </div>
            <Link href="/gallery" className="btn-line">View Full Gallery <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
          <div className="mosaic">
            {MOSAIC.map((m) => (
              <Link key={m.img} href="/gallery" className={`mosaic-item${m.tall ? " tall" : ""}`}>
                <img src={m.img} alt={m.alt} />
                <span className="cap">{m.cap} <i className="fa-solid fa-arrow-up-right"></i></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="cta-editorial bg-deep">
        <div className="container">
          <span className="tag" style={{ justifyContent: "center" }}>Get In Touch</span>
          <Reveal as="h2" className="display-2">Ready to upgrade your space with Verenza?</Reveal>
          <Reveal as="p" className="body-sub" style={{ margin: "0 auto 34px" }}>Talk to our team for bulk pricing, dealership opportunities, or custom finishing options on our stainless steel range.</Reveal>
          <div className="btn-row">
            <MagneticButton href="/contact" className="btn-fill"><span>Contact Us</span></MagneticButton>
            <MagneticButton href="/catalogue" className="btn-outline-editorial">Download Catalogue</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
