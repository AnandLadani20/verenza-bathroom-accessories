import productsRaw from "@/data/products.json";

export const CATEGORIES = [
  { key: "kv", label: "Designer Towel Rings", desc: "Sleek wall-mounted rings finished in mirror-polished stainless steel." },
  { key: "re", label: "Premium Towel Rings", desc: "Elegant oval-base rings engineered for everyday durability." },
  { key: "br", label: "Decorative Towel Hangers", desc: "Statement hangers that blend artistic design with function." },
  { key: "ca", label: "Corner & Multipurpose Shelves", desc: "Space-saving corner shelves for shower and vanity areas." },
  { key: "bath", label: "Bath Racks & Holders", desc: "Towel racks, paper holders, robe hooks and accessory sets." },
  { key: "kt", label: "Kitchen Racks & Organizers", desc: "Heavy-duty stainless steel racks for modern kitchens." },
];

export function getCategoryMeta(key) {
  return CATEGORIES.find((c) => c.key === key) || { key, label: key, desc: "" };
}

function fixPath(p) {
  return p ? p.replace("assets/images/products/", "/products/") : p;
}

let cache = null;

export function getAllProducts() {
  if (cache) return cache;
  cache = productsRaw.map((p) => {
    const images = (p.images && p.images.length ? p.images : [p.image]).map(fixPath);
    const finishImages = p.finishImages
      ? p.finishImages.map((f) => ({ ...f, image: fixPath(f.image) }))
      : null;
    return {
      ...p,
      image: fixPath(p.image),
      images,
      finishImages,
    };
  });
  return cache;
}

export function getProductById(id) {
  const numId = parseInt(id, 10);
  return getAllProducts().find((p) => p.id === numId);
}

export function getRelatedProducts(product, limit = 4) {
  return getAllProducts()
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, limit);
}

export function getFeaturedProducts() {
  const featuredSeries = ["1002", "2007", "4005", "4004", "5010", "5026", "6002", "5015"];
  const catalog = getAllProducts();
  return featuredSeries
    .map((s) => catalog.find((p) => p.series === s))
    .filter(Boolean);
}
