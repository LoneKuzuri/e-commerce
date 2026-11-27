import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { formatPrice, getCategoryLabel, getCategoryMeta } from "../lib/catalog";

function CartItem({ item, updateCartQuantity, removeFromCart }) {
  const [imageFailed, setImageFailed] = useState(false);

  const meta = getCategoryMeta(item.category);
  const maxStock = item.numericStock ?? 999;
  const lineTotal = item.price * item.quantity;

  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-card sm:p-4">
      {/* Thumbnail */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted sm:h-20 sm:w-20">
        {item.image && !imageFailed ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-contain p-1.5"
          />
        ) : (
          <FontAwesomeIcon
            icon={meta.icon}
            className="h-6 w-6 text-muted-foreground opacity-40"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-card-foreground sm:text-[15px]">
          {item.name}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {getCategoryLabel(item.category)} · {formatPrice(item.price)}
          {item.unit && `/${item.unit}`}
        </p>
        <p className="mt-1.5 font-display text-base font-extrabold tabular-nums text-card-foreground">
          {formatPrice(lineTotal)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <div className="flex items-center gap-1 rounded-md border border-border bg-muted/60 p-1">
          <button
            type="button"
            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-sm bg-card text-foreground shadow-subtle transition-colors hover:bg-background"
            aria-label={`Decrease ${item.name} quantity`}
          >
            <FontAwesomeIcon icon={faMinus} className="h-2.5 w-2.5" />
          </button>

          <span className="w-7 text-center text-sm font-semibold tabular-nums text-foreground">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= maxStock}
            className="flex h-7 w-7 items-center justify-center rounded-sm bg-card text-foreground shadow-subtle transition-colors hover:bg-background disabled:opacity-40"
            aria-label={`Increase ${item.name} quantity`}
          >
            <FontAwesomeIcon icon={faPlus} className="h-2.5 w-2.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          className="flex items-center gap-1.5 rounded-sm px-1 text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
          aria-label={`Remove ${item.name} from cart`}
        >
          <FontAwesomeIcon icon={faTrashCan} className="h-3 w-3" />
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </div>
  );
}

export default CartItem;
