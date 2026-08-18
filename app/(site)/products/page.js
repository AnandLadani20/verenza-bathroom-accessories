import Masthead from "@/components/Masthead";
import ProductGrid from "@/components/ProductGrid";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { getAllProducts, getCategoryMeta } from "@/lib/products";

export const metadata = {
  title: "Products | Verenza Stainless Steel Bathroom Accessories",
  description:
    "Browse Verenza's full range of premium stainless steel bathroom accessories — towel rings, hangers, corner shelves, bath racks and kitchen organizers.",
  alternates: { canonical: "https://www.verenza.com/products" },
  openGraph: {
    title: "Products | Verenza Stainless Steel Bathroom Accessories",
    description:
      "Browse Verenza's full range of premium stainless steel bathroom accessories — towel rings, hangers, corner shelves, bath racks and kitchen organizers.",
    images: [{ url: "/images/gallery/gallery12.jpg", width: 1600, height: 1280, alt: "Verenza product collection" }],
  },
};

export default function ProductsPage() {
  const products = getAllProducts().map((p) => ({
    ...p,
    label: getCategoryMeta(p.catCode).label,
  }));

  return (
    <>
      <Masthead
        img="/images/gallery/gallery12.jpg"
        alt="Verenza mirror and vanity styling"
        tag="Full Catalogue"
        title="Our Products"
        breadcrumbLabel="Products"
        sub="65+ stainless steel designs across six collections."
      />

      <section className="section">
        <div className="container">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="cta-editorial bg-deep">
        <span className="ghost-num">+</span>
        <div className="container">
          <span className="tag" style={{ justifyContent: "center" }}>Need Custom Sizes?</span>
          <Reveal as="h2" className="display-2">Looking for bulk or custom orders?</Reveal>
          <Reveal as="p" className="body-sub" style={{ margin: "0 auto 34px" }}>We offer OEM/ODM services and custom finishing for retailers, contractors and project clients.</Reveal>
          <div className="btn-row">
            <MagneticButton href="/contact" className="btn-fill"><span>Request a Quote</span></MagneticButton>
            <MagneticButton href="/catalogue" className="btn-outline-editorial">Download Catalogue</MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
