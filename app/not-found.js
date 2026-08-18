export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: "190px", textAlign: "center" }}>
      <div className="container">
        <span className="tag" style={{ justifyContent: "center" }}>404</span>
        <h1 className="display-2">Page not found</h1>
        <p className="body-sub" style={{ margin: "20px auto 34px" }}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <a href="/" className="btn-fill"><span>Back to Home</span></a>
          <a href="/products" className="btn-outline-editorial">View Products</a>
        </div>
      </div>
    </section>
  );
}
