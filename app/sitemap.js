import { getAllProducts } from "@/lib/products";

const BASE_URL = "https://www.verenza.com";

export default function sitemap() {
  const staticRoutes = ["", "/about", "/products", "/gallery", "/catalogue", "/contact"].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = getAllProducts().map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
