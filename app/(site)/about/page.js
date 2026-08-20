import Link from "next/link";
import Masthead from "@/components/Masthead";
import StatsBand from "@/components/StatsBand";
import Reveal from "@/components/motion/Reveal";
import RevealScale from "@/components/motion/RevealScale";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import MagneticButton from "@/components/motion/MagneticButton";

export const metadata = {
  title: "About Us | Verenza – Stainless Steel Accessories Manufacturer in Rajkot, Gujarat",
  description:
    "Learn about Verenza — a Rajkot, Gujarat-based premium stainless steel bathroom and kitchen accessories manufacturer focused on design, durability, and craftsmanship.",
  alternates: { canonical: "https://www.verenza.com/about" },
  openGraph: {
    title: "About Us | Verenza – Stainless Steel Accessories Manufacturer in Rajkot, Gujarat",
    description:
      "Learn about Verenza — a Rajkot, Gujarat-based premium stainless steel bathroom and kitchen accessories manufacturer focused on design, durability, and craftsmanship.",
    images: [{ url: "/images/gallery/gallery7.png", width: 1600, height: 1280, alt: "Verenza premium bathroom interior" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Masthead
        img="/images/gallery/gallery7.png"
        alt="Verenza premium bathroom interior"
        tag="Who We Are"
        title="About Verenza"
        breadcrumbLabel="About Us"
        breadcrumbPath="/about"
        sub="Precision engineering in stainless steel, proudly made in Rajkot, Gujarat."
      />

      {/* ===================== OUR STORY ===================== */}
      <section className="section">
        <div className="container">
          <div className="split-editorial">
            <div className="g-start-1"><span className="tag">Our Story</span></div>
            <Reveal as="p" className="lede">What started as a small manufacturing unit in Rajkot, Gujarat has grown into a trusted brand known for <em>precision engineering</em>, modern aesthetics and lasting quality.</Reveal>
            <Reveal as="div" className="side">
              <p className="body-sub">Today, our catalogue spans towel rings, decorative hangers, corner shelves, bath racks and kitchen organizers — each piece designed in-house and finished to a flawless mirror shine using 202 & 304-grade stainless steel.</p>
              <Link href="/contact" className="btn-line" style={{ marginTop: "22px" }}>Partner With Us <i className="fa-solid fa-arrow-right"></i></Link>
            </Reveal>
          </div>
          <RevealScale className="offset-media">
            <div className="offset-media-frame">
              <img src="/images/gallery/gallery23.jpg" alt="Verenza stainless steel craftsmanship" />
            </div>
            <div className="offset-badge">
              <div className="num">65+</div>
              <div className="lbl">Product Designs</div>
            </div>
          </RevealScale>
        </div>
      </section>

      {/* ===================== MISSION / VISION / VALUES ===================== */}
      <section className="section bg-deep">
        <div className="container">
          <span className="tag">What Drives Us</span>
          <Reveal as="h2" className="section-title" style={{ maxWidth: "600px" }}>Mission, vision &amp; values</Reveal>
          <Stagger className="value-row" style={{ marginTop: "40px" }}>
            <StaggerItem className="value-item">
              <div><h4>Our Mission</h4><p>To deliver stainless steel accessories that combine premium design with everyday durability — at a price that delivers real value to our partners and customers.</p></div>
            </StaggerItem>
            <StaggerItem className="value-item">
              <div><h4>Our Vision</h4><p>To become a leading name in premium stainless steel home accessories, recognized for design innovation, reliability and consistent quality across India and beyond.</p></div>
            </StaggerItem>
            <StaggerItem className="value-item">
              <div><h4>Our Values</h4><p>Integrity in every transaction, precision in every product, and a relentless commitment to customer satisfaction guide everything we do at Verenza.</p></div>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* ===================== MANUFACTURING PROCESS ===================== */}
      <section className="section">
        <div className="container">
          <span className="tag">How We Work</span>
          <Reveal as="h2" className="section-title" style={{ maxWidth: "600px" }}>Our manufacturing process</Reveal>
          <Reveal as="p" className="body-sub">From raw material selection to final quality inspection, every step is carefully controlled to ensure a premium finish.</Reveal>
          <Stagger className="process-row" style={{ marginTop: "50px" }}>
            <StaggerItem className="process-col"><span className="pnum">01</span><h4>Material Sourcing</h4><p>High-grade 304 & 202 stainless steel sheets and rods sourced from trusted suppliers.</p></StaggerItem>
            <StaggerItem className="process-col"><span className="pnum">02</span><h4>Precision Cutting</h4><p>CNC laser cutting and bending for accurate, repeatable component shapes.</p></StaggerItem>
            <StaggerItem className="process-col"><span className="pnum">03</span><h4>Mirror Polishing</h4><p>Multi-stage buffing process delivers a brilliant, long-lasting mirror finish.</p></StaggerItem>
            <StaggerItem className="process-col"><span className="pnum">04</span><h4>Quality Inspection</h4><p>Every batch undergoes strict checks before packaging and dispatch.</p></StaggerItem>
          </Stagger>
        </div>
      </section>

      <StatsBand bgImage="/images/gallery/gallery13.jpg" bgAlt="Verenza stainless steel manufacturing" tag="Verenza By The Numbers" />

      {/* ===================== CTA ===================== */}
      <section className="cta-editorial bg-deep">
        <div className="container">
          <span className="tag" style={{ justifyContent: "center" }}>Work With Us</span>
          <Reveal as="h2" className="display-2">Become a Verenza dealer</Reveal>
          <Reveal as="p" className="body-sub" style={{ margin: "0 auto 34px" }}>Join our growing network of distributors and retailers offering premium stainless steel accessories to customers across India.</Reveal>
          <div className="btn-row">
            <MagneticButton href="/contact" className="btn-fill"><span>Contact Us</span></MagneticButton>
            <MagneticButton href="/products" className="btn-outline-editorial">View Products</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
