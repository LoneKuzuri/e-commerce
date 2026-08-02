import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { formatPrice, getCategoryLabel, getCategoryMeta, TINT_CLASSES } from "../lib/catalog";

const ProductCard = ({ product, onAddToCart, cartQuantity = 0, onUpdateQuantity }) => {
  const [imageState, setImageState] = useState("loading");

  const meta = getCategoryMeta(product.category);
  const maxStock = product.numericStock ?? 999;
  const isOutOfStock = !product.inStock;
  const isInCart = cartQuantity > 0;
  const atStockLimit = cartQuantity >= maxStock;

  const handleAddToCart = () => {
    if (!isOutOfStock) onAddToCart?.(product);
  };

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-shadow duration-300 hover:shadow-lift ${
        isOutOfStock ? "opacity-70" : ""
      }`}
    >
      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.image && imageState !== "error" ? (
          <>
            {imageState === "loading" && (
              <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />
            )}
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImageState("loaded")}
              onError={() => setImageState("error")}
              className={`h-full w-full object-contain p-4 transition-all duration-500 group-hover:scale-[1.04] ${
                imageState === "loaded" ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground"
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={meta.icon} className="h-9 w-9 opacity-40" />
          </div>
        )}

        {/* Category chip */}
        {product.category && (
          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              TINT_CLASSES[meta.tint]
            }`}
          >
            <FontAwesomeIcon icon={meta.icon} className="h-3 w-3" />
            {getCategoryLabel(product.category)}
          </span>
        )}

        {/* Stock state */}
        {isOutOfStock ? (
          <span className="absolute right-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-semibold text-destructive-foreground">
            Out of stock
          </span>
        ) : (
          isInCart && (
            <span className="absolute right-3 top-3 flex h-6 min-w-6 animate-scale-in items-center justify-center rounded-full bg-primary px-1.5 text-xs font-bold tabular-nums text-primary-foreground">
              {cartQuantity}
            </span>
          )
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-card-foreground">
            {product.name}
          </h3>
          {product.description && (
            <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between gap-2">
          <p className="font-display text-xl font-extrabold tabular-nums text-card-foreground">
            {formatPrice(product.price)}
            {product.unit && (
              <span className="text-xs font-medium text-muted-foreground">/{product.unit}</span>
            )}
          </p>
          {!isOutOfStock && product.numericStock !== null && (
            <p className="text-[11px] font-medium tabular-nums text-muted-foreground">
              {product.numericStock} left
            </p>
          )}
        </div>

        {/* Action */}
        {!isInCart ? (
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100"
          >
            <FontAwesomeIcon icon={faCartPlus} className="h-3.5 w-3.5" />
            {isOutOfStock ? "Unavailable" : "Add to cart"}
          </button>
        ) : (
          <div className="flex h-11 items-center justify-between rounded-md border border-border bg-muted/60 px-1.5">
            <button
              type="button"
              onClick={() => onUpdateQuantity?.(product.id, cartQuantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-card text-foreground shadow-subtle transition-colors hover:bg-background"
              aria-label={`Remove one ${product.name}`}
            >
              <FontAwesomeIcon icon={faMinus} className="h-3 w-3" />
            </button>

            <span className="text-center text-sm font-semibold tabular-nums text-foreground">
              {cartQuantity}
              <span className="ml-1.5 font-normal text-muted-foreground">
                · {formatPrice(product.price * cartQuantity)}
              </span>
            </span>

            <button
              type="button"
              onClick={() => onUpdateQuantity?.(product.id, cartQuantity + 1)}
              disabled={atStockLimit}
              className="flex h-8 w-8 items-center justify-center rounded-sm bg-card text-foreground shadow-subtle transition-colors hover:bg-background disabled:opacity-40"
              aria-label={`Add one more ${product.name}`}
            >
              <FontAwesomeIcon icon={faPlus} className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
