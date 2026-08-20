import Link from "next/link";

export default function Masthead({ img, alt, tag, title, breadcrumbLabel, breadcrumbPath, sub }) {
  const breadcrumbJsonLd = breadcrumbPath
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.verenza.com/" },
          { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: `https://www.verenza.com${breadcrumbPath}` },
        ],
      }
    : null;

  return (
    <section className="masthead">
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}
      <div className="masthead-media"><img src={img} alt={alt} /></div>
      <div className="container masthead-row">
        <div>
          <span className="tag">{tag}</span>
          <h1>{title}</h1>
        </div>
        <div className="masthead-meta">
          <div className="breadcrumb-row"><Link href="/">Home</Link><span className="sep">/</span><span>{breadcrumbLabel}</span></div>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: "320px" }}>{sub}</p>
        </div>
      </div>
    </section>
  );
}
