import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faHouse,
  faLayerGroup,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

const TABS = [
  { key: "home", icon: faHouse, label: "Shop" },
  { key: "categories", icon: faLayerGroup, label: "Categories" },
  { key: "cart", icon: faBagShopping, label: "Cart" },
  { key: "profile", icon: faStore, label: "Store" },
];

function BottomNav({ activeTab, setActiveTab, cartCount = 0 }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 pb-safe backdrop-blur-md lg:hidden"
      aria-label="Primary"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <li key={tab.key} className="flex-1">
              <button
                type="button"
                onClick={() => setActiveTab(tab.key)}
                aria-current={isActive ? "page" : undefined}
                className={`flex w-full flex-col items-center gap-1 rounded-lg px-1 py-2 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="relative">
                  <FontAwesomeIcon icon={tab.icon} className="h-[18px] w-[18px]" />
                  {tab.key === "cart" && cartCount > 0 && (
                    <span className="absolute -right-2.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold tabular-nums text-accent-foreground">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-medium">{tab.label}</span>
                <span
                  className={`h-0.5 w-6 rounded-full transition-colors ${
                    isActive ? "bg-primary" : "bg-transparent"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BottomNav;
