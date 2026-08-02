// Base URL of the Strapi backend. Override with VITE_API_BASE_URL in a .env file.
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:1337").replace(/\/$/, "");
const API_URL = `${BASE_URL}/api`;

/** Resolve a Strapi media path into an absolute URL. */
const resolveImageUrl = (path) => {
  if (!path) return null;
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
};

/** Normalise a raw Strapi product record into the shape the UI expects. */
const mapProduct = (item) => {
  if (!item || !item.id) return null;

  const stock = item.stock ?? 0;
  const numericStock = typeof stock === "number" ? stock : null;
  const inStock = typeof stock === "boolean" ? stock : (numericStock ?? 0) > 0;

  return {
    id: item.id,
    name: item.name || "Unnamed product",
    description: item.description || "",
    price: item.Price ?? 0,
    unit: item.unit || "",
    stock,
    numericStock,
    inStock,
    status: item.stat || "available",
    image: resolveImageUrl(item.Image?.[0]?.url),
    category: item.category || "Uncategorized",
  };
};

/** Fetch every product in the catalogue. */
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products?populate=*`);
  if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
  const data = await res.json();
  return (data.data || []).map(mapProduct).filter(Boolean);
};

/** Fetch products belonging to a single category. */
export const fetchProductsByCategory = async (category) => {
  const res = await fetch(
    `${API_URL}/products?filters[category][$eq]=${encodeURIComponent(category)}&populate=*`
  );
  if (!res.ok) throw new Error(`Failed to fetch products for "${category}" (${res.status})`);
  const data = await res.json();
  return (data.data || []).map(mapProduct).filter(Boolean);
};

/** Derive the category list (with product counts) from a set of products. */
export const deriveCategories = (products = []) => {
  const counts = new Map();

  for (const product of products) {
    if (!product?.category) continue;
    counts.set(product.category, (counts.get(product.category) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      count,
    }))
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
};

/** Fetch the category list straight from the API. */
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/products?fields=category`);
  if (!res.ok) throw new Error(`Failed to fetch categories (${res.status})`);
  const data = await res.json();
  return deriveCategories(data.data || []);
};
