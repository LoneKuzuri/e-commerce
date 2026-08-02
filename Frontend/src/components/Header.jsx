import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faMagnifyingGlass,
  faMoon,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../hooks/useTheme";
import { formatPrice } from "../lib/catalog";

const NAV_LINKS = [
  { key: "home", label: "Shop" },
  { key: "categories", label: "Categories" },
  { key: "profile", label: "Store info" },
];

function Header({ searchQuery, setSearchQuery, totalItems, totalPrice, activeTab, setActiveTab }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6 sm:px-6 lg:py-4">
        {/* Logo */}
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          className="flex shrink-0 items-center gap-2.5 rounded-md"
          aria-label="Subha OM Enterprises, go to shop"
        >
          <img
            src="/Subha om Logo.png"
            alt=""
            className="h-9 w-9 rounded-md object-contain sm:h-10 sm:w-10"
          />
          <span className="hidden text-left leading-tight sm:block">
            <span className="block font-display text-sm font-extrabold text-foreground">
              Subha OM
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Enterprises
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              type="button"
              onClick={() => setActiveTab(link.key)}
              aria-current={activeTab === link.key ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === link.key
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search */}
        <div className="relative min-w-0 flex-1 lg:max-w-sm">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
          />
          <label htmlFor="product-search" className="sr-only">
            Search products
          </label>
          <input
            id="product-search"
            type="search"
            inputMode="search"
            placeholder="Search rice, oil, daal…"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => activeTab !== "home" && setActiveTab("home")}
            className="h-10 w-full rounded-full border border-input bg-card pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/25 [&::-webkit-search-cancel-button]:hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <FontAwesomeIcon icon={faXmark} className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cart")}
            className="relative flex h-10 items-center gap-2.5 rounded-full bg-primary px-3 text-primary-foreground transition-opacity hover:opacity-90 sm:pl-4 sm:pr-5"
            aria-label={`Open cart, ${totalItems} ${totalItems === 1 ? "item" : "items"}`}
          >
            <FontAwesomeIcon icon={faBagShopping} className="h-4 w-4" />
            {totalItems > 0 ? (
              <span className="hidden text-sm font-semibold tabular-nums sm:block">
                {formatPrice(totalPrice)}
              </span>
            ) : (
              <span className="hidden text-sm font-semibold sm:block">Cart</span>
            )}
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 animate-scale-in items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold tabular-nums text-accent-foreground ring-2 ring-background">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
