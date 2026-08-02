import CategoryList from "../components/CategoryList";

function Categories({ categories, isLoading, selectedCategory, onBrowseCategory }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <header className="max-w-2xl animate-fade-up">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground text-balance sm:text-4xl">
          Browse every category
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Everything we stock, grouped so you can find it fast. Pick a category to jump straight to
          those products.
        </p>
      </header>

      <div className="mt-8">
        <CategoryList
          categories={categories}
          isLoading={isLoading}
          selectedCategory={selectedCategory}
          onSelect={onBrowseCategory}
        />
      </div>

      {/* Closing prompt */}
      <div className="mt-10 flex flex-col items-start gap-4 rounded-lg border border-border bg-primary-soft p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-extrabold text-foreground">
            Not sure where to start?
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse the full catalogue and filter as you go.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onBrowseCategory(null)}
          className="flex h-11 shrink-0 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          View all products
        </button>
      </div>
    </section>
  );
}

export default Categories;
