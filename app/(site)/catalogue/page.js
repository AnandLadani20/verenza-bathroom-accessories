import Link from "next/link";
import Masthead from "@/components/Masthead";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";

export const metadata = {
  title: "Catalogue | Verenza Stainless Steel Bathroom Accessories",
  description:
    "Download the Verenza product catalogue — full specifications and designs for our stainless steel bathroom and kitchen accessory ranges.",
  alternates: { canonical: "https://www.verenza.com/catalogue" },
  openGraph: {
    title: "Catalogue | Verenza Stainless Steel Bathroom Accessories",
    description:
      "Download the Verenza product catalogue — full specifications and designs for our stainless steel bathroom and kitchen accessory ranges.",
    images: [{ url: "/images/gallery/gallery9.jpg", width: 1600, height: 1280, alt: "Verenza bathroom accessory set" }],
  },
};

export default function CataloguePage() {
  return (
    <>
      <Masthead
        img="/images/gallery/gallery9.jpg"
        alt="Verenza bathroom accessory set"
        tag="Complete Product Range"
        title="Catalogue"
        breadcrumbLabel="Catalogue"
        sub="Specifications, dimensions and finish options in one PDF."
      />

      <section className="cta-editorial">
        <div className="container">
          <span className="tag" style={{ justifyContent: "center" }}>Full PDF</span>
          <Reveal as="h2" className="display-2">Download the Verenza master catalogue</Reveal>
          <Reveal as="p" className="body-sub" style={{ margin: "0 auto 34px" }}>Get specifications, dimensions and finish options for our entire collection of stainless steel bathroom and kitchen accessories in a single PDF.</Reveal>
          <div className="btn-row">
            <MagneticButton href="/pdf/verenza-full-catalog.pdf" className="btn-fill" download>
              <span><i className="fa-solid fa-file-pdf"></i>&nbsp; Download Master Catalogue</span>
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-12" style={{ alignItems: "center" }}>
            <div className="g-span-3"><span className="tag">Need Assistance?</span></div>
            <div className="g-span-8" style={{ gridColumn: "span 8" }}>
              <Reveal as="h2" className="section-title">Can&apos;t find what you&apos;re looking for?</Reveal>
              <Reveal as="p" className="body-sub">Our team can prepare custom catalogues, price lists, or specification sheets tailored to your business requirements.</Reveal>
              <Link href="/contact" className="btn-line" style={{ marginTop: "22px" }}>Talk to Our Team <i className="fa-solid fa-arrow-right"></i></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
