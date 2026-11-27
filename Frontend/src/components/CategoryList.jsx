import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { categories as fallbackCategories } from "../data/categories";
import { getCategoryLabel, getCategoryMeta, TINT_CLASSES } from "../lib/catalog";

function CategoryList({ categories = [], isLoading, selectedCategory, onSelect }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-lg border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  // Fall back to the static list if the API returned nothing, so the page is never blank.
  const items =
    categories.length > 0
      ? categories
      : fallbackCategories.map((name) => ({ name, displayName: name, count: null }));

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((category) => {
        const meta = getCategoryMeta(category.name);
        const isSelected = selectedCategory === category.name;

        return (
          <li key={category.name}>
            <button
              type="button"
              onClick={() => onSelect(category.name)}
              aria-pressed={isSelected}
              className={`group flex h-full w-full flex-col items-start gap-3 rounded-lg border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift ${
                isSelected
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  TINT_CLASSES[meta.tint]
                }`}
              >
                <FontAwesomeIcon icon={meta.icon} className="h-5 w-5" />
              </span>

              <span className="flex-1">
                <span className="block font-display text-[15px] font-bold text-card-foreground">
                  {getCategoryLabel(category.name)}
                </span>
                {category.count !== null && (
                  <span className="mt-0.5 block text-xs font-medium tabular-nums text-muted-foreground">
                    {category.count} {category.count === 1 ? "product" : "products"}
                  </span>
                )}
              </span>

              <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                Shop now
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="h-2.5 w-2.5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryList;
