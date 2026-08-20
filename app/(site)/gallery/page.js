import Masthead from "@/components/Masthead";
import GalleryGrid from "@/components/GalleryGrid";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";

export const metadata = {
  title: "Gallery | Verenza Stainless Steel Bathroom Accessories",
  description:
    "Explore Verenza's photo gallery showcasing our premium stainless steel bathroom and kitchen accessory collections in detail.",
  alternates: { canonical: "https://www.verenza.com/gallery" },
  openGraph: {
    title: "Gallery | Verenza Stainless Steel Bathroom Accessories",
    description:
      "Explore Verenza's photo gallery showcasing our premium stainless steel bathroom and kitchen accessory collections in detail.",
    images: [{ url: "/images/gallery/gallery16.png", width: 1600, height: 1280, alt: "Verenza bathroom lifestyle" }],
  },
};

export default function GalleryPage() {
  return (
    <>
      <Masthead
        img="/images/gallery/gallery8.jpg"
        alt="Verenza bathroom lifestyle"
        tag="Visual Showcase"
        title="Gallery"
        breadcrumbLabel="Gallery"
        breadcrumbPath="/gallery"
        sub="Click any image to view it in full size."
      />

      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>

      <section className="cta-editorial bg-deep">
        <span className="ghost-num">+</span>
        <div className="container">
          <span className="tag" style={{ justifyContent: "center" }}>Like What You See?</span>
          <Reveal as="h2" className="display-2">Browse our full product range</Reveal>
          <Reveal as="p" className="body-sub" style={{ margin: "0 auto 34px" }}>Discover specifications, model numbers and the complete Verenza catalogue.</Reveal>
          <div className="btn-row">
            <MagneticButton href="/products" className="btn-fill"><span>View Products</span></MagneticButton>
            <MagneticButton href="/catalogue" className="btn-outline-editorial">Download Catalogue</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
