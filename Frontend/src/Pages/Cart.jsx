import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faArrowLeft, faTruckFast } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import CartItem from "../components/CartItem";
import { formatPrice } from "../lib/catalog";

const WHATSAPP_NUMBER = "9779857032030";
const FREE_DELIVERY_THRESHOLD = 2000;

function Cart({
  cart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  totalItems,
  totalPrice,
  setActiveTab,
}) {
  const qualifiesForFreeDelivery = totalPrice >= FREE_DELIVERY_THRESHOLD;
  const remainingForFreeDelivery = Math.max(FREE_DELIVERY_THRESHOLD - totalPrice, 0);

  const handleWhatsAppOrder = () => {
    const lines = cart
      .map(
        (item) =>
          `• ${item.name} — ${formatPrice(item.price)} × ${item.quantity} = ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const message = [
      "Hello Subha OM Enterprises, I would like to place an order:",
      "",
      lines,
      "",
      `Total (${totalItems} ${totalItems === 1 ? "item" : "items"}): ${formatPrice(totalPrice)}`,
      "",
      "Please confirm my order. Thank you!",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Empty state
  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex animate-fade-up flex-col items-center gap-5 rounded-lg border border-dashed border-border bg-card px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary">
            <FontAwesomeIcon icon={faBagShopping} className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-card-foreground">
              Your cart is empty
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Add rice, oil, lentils or any daily staple and we&apos;ll get your order ready for
              WhatsApp checkout.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className="flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="h-3.5 w-3.5" />
            Browse products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Your cart
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"} ready to order
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
        >
          Clear cart
        </button>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Line items */}
        <ul className="space-y-3">
          {cart.map((item) => (
            <li key={item.id}>
              <CartItem
                item={item}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
              />
            </li>
          ))}
        </ul>

        {/* Order summary */}
        <aside className="rounded-lg border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-extrabold text-card-foreground">
            Order summary
          </h2>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Items</dt>
              <dd className="font-semibold tabular-nums text-card-foreground">{totalItems}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold tabular-nums text-card-foreground">
                {formatPrice(totalPrice)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd className="font-semibold text-success">
                {qualifiesForFreeDelivery ? "Free" : "Confirmed on call"}
              </dd>
            </div>

            <div className="flex items-baseline justify-between border-t border-border pt-4">
              <dt className="font-display text-base font-extrabold text-card-foreground">Total</dt>
              <dd className="font-display text-2xl font-extrabold tabular-nums text-card-foreground">
                {formatPrice(totalPrice)}
              </dd>
            </div>
          </dl>

          {/* Free delivery nudge */}
          <p className="mt-4 flex items-start gap-2.5 rounded-md bg-primary-soft px-3.5 py-3 text-[13px] leading-relaxed text-foreground">
            <FontAwesomeIcon icon={faTruckFast} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            {qualifiesForFreeDelivery
              ? "Great news — this order qualifies for free local delivery."
              : `Add ${formatPrice(remainingForFreeDelivery)} more for free local delivery.`}
          </p>

          <button
            type="button"
            onClick={handleWhatsAppOrder}
            className="mt-5 flex h-12 w-full items-center justify-center gap-2.5 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4" />
            Order on WhatsApp
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className="mt-2.5 flex h-11 w-full items-center justify-center gap-2 rounded-md border border-border text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Continue shopping
          </button>

          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            No online payment needed. We confirm every order on WhatsApp before dispatch.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
