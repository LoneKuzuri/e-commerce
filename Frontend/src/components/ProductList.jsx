import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRotateRight,
  faBoxOpen,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import ProductCard from "./ProductCard";
import { getCategoryLabel, getCategoryMeta } from "../lib/catalog";

/** Placeholder cards shown while the catalogue loads. */
function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-muted" />
        <div className="h-11 w-full animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}

function ProductList({
  products,
  categories,
  isLoading,
  error,
  reload,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  addToCart,
  updateCartQuantity,
  getCartItemQuantity,
}) {
  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        getCategoryLabel(product.category).toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [products, searchQuery, selectedCategory]);

  const hasActiveFilters = Boolean(selectedCategory || searchQuery.trim());

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
  };

  return (
    <section id="catalogue" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Section heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {selectedCategory ? getCategoryLabel(selectedCategory) : "All products"}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isLoading
              ? "Loading the latest catalogue…"
              : `${visibleProducts.length} ${
                  visibleProducts.length === 1 ? "product" : "products"
                } available${searchQuery.trim() ? ` for "${searchQuery.trim()}"` : ""}`}
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Category filter chips */}
      {categories.length > 0 && (
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            aria-pressed={!selectedCategory}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              !selectedCategory
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>

          {categories.map((category) => {
            const isActive = selectedCategory === category.name;
            const meta = getCategoryMeta(category.name);

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => setSelectedCategory(isActive ? null : category.name)}
                aria-pressed={isActive}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                <FontAwesomeIcon icon={meta.icon} className="h-3.5 w-3.5" />
                {getCategoryLabel(category.name)}
                <span className="tabular-nums opacity-60">{category.count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Content states */}
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-card px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
              <FontAwesomeIcon icon={faTriangleExclamation} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                Catalogue unavailable
              </h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                We could not reach the store server. Check your connection and try again — your cart
                is safe.
              </p>
            </div>
            <button
              type="button"
              onClick={() => reload()}
              className="flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <FontAwesomeIcon icon={faArrowRotateRight} className="h-3.5 w-3.5" />
              Try again
            </button>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-card px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <FontAwesomeIcon icon={faBoxOpen} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-card-foreground">
                No products found
              </h3>
              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {hasActiveFilters
                  ? "Nothing matches these filters yet. Try a different category or search term."
                  : "Our shelves are being restocked. Please check back shortly."}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                cartQuantity={getCartItemQuantity(product.id)}
                onUpdateQuantity={updateCartQuantity}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductList;
