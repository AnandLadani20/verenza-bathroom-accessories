import { notFound } from "next/navigation";
import ProductDetailView from "@/components/ProductDetailView";
import { getAllProducts, getProductById, getRelatedProducts, getCategoryMeta } from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found | Verenza" };

  const title = `${product.name} — ${product.series} | Verenza`;
  const description = product.description;

  return {
    title,
    description,
    alternates: { canonical: `https://www.verenza.com/products/${product.id}` },
    openGraph: {
      title,
      description,
      siteName: "Verenza",
      type: "website",
      locale: "en_IN",
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = getRelatedProducts(product).map((p) => ({
    ...p,
    label: getCategoryMeta(p.catCode).label,
  }));

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://www.verenza.com${product.image}`,
    description: product.description,
    sku: product.series,
    brand: { "@type": "Brand", name: "Verenza" },
    material: product.material,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(product.priceValue || "").replace(/[^0-9.]/g, "") || undefined,
      availability: "https://schema.org/InStock",
      url: `https://www.verenza.com/products/${product.id}`,
      areaServed: [
        { "@type": "City", name: "Rajkot" },
        { "@type": "State", name: "Gujarat" },
        { "@type": "Country", name: "India" },
      ],
      seller: { "@type": "LocalBusiness", "@id": "https://www.verenza.com/#organization", name: "Verenza Enterprise" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.verenza.com/" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://www.verenza.com/products" },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://www.verenza.com/products/${product.id}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailView product={product} related={related} />
    </>
  );
}
