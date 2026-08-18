import Link from "next/link";

export default function Masthead({ img, alt, tag, title, breadcrumbLabel, sub }) {
  return (
    <section className="masthead">
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
