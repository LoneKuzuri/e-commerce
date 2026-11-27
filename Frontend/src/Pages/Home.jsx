import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLocationDot,
  faSackDollar,
  faShieldHeart,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import ProductList from "../components/ProductList";
import { categories as fallbackCategories } from "../data/categories";
import { getCategoryLabel, getCategoryMeta, TINT_CLASSES } from "../lib/catalog";

const VALUE_PROPS = [
  {
    icon: faSackDollar,
    title: "Wholesale prices",
    description: "Bulk rates on every daily staple, no membership needed.",
  },
  {
    icon: faShieldHeart,
    title: "Quality checked",
    description: "Every sack and bottle inspected before it hits the shelf.",
  },
  {
    icon: faTruckFast,
    title: "Same-day delivery",
    description: "Free drop-off across Omsatiya on orders over Rs. 2,000.",
  },
];

function Home({ categories, onBrowseCategory, ...catalogProps }) {
  // Use live categories where available, otherwise fall back to the known list.
  const quickCategories = (
    categories.length > 0
      ? categories.slice(0, 8).map((category) => category.name)
      : fallbackCategories.slice(0, 8)
  );

  const scrollToCatalogue = () => {
    document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-primary-soft">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1.5 text-xs font-semibold text-primary">
              <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3" />
              Omsatiya-01, Rupandehi
            </span>

            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
              Your daily staples, at wholesale prices.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Rice, lentils, cooking oil and every essential your kitchen runs on — trusted by the
              neighbourhood since 2081. Build your basket and send it straight to us on WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToCatalogue}
                className="flex h-12 items-center gap-2.5 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start shopping
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5" />
              </button>

              <a
                href="https://wa.me/9779857032030"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center gap-2.5 rounded-md border border-border bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="h-4 w-4 text-[#25D366]" />
                Chat with us
              </a>
            </div>

            {/* Stats */}
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-primary/15 pt-6">
              {[
                { value: "500+", label: "Products" },
                { value: "2081", label: "Established" },
                { value: "Free", label: "Local delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-extrabold text-primary">
                      {stat.value}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Category quick-pick panel */}
          <div className="mt-12 animate-fade-up rounded-lg border border-border bg-card p-6 shadow-card lg:mt-0 lg:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-lg font-extrabold text-card-foreground">
                Shop by category
              </h2>
              <button
                type="button"
                onClick={() => onBrowseCategory(null)}
                className="text-sm font-semibold text-primary transition-opacity hover:opacity-70"
              >
                View all
              </button>
            </div>

            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {quickCategories.map((name) => {
                const meta = getCategoryMeta(name);

                return (
                  <li key={name}>
                    <button
                      type="button"
                      onClick={() => onBrowseCategory(name)}
                      className="flex w-full flex-col items-center gap-2.5 rounded-md border border-border bg-background p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
                    >
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                          TINT_CLASSES[meta.tint]
                        }`}
                      >
                        <FontAwesomeIcon icon={meta.icon} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="text-center text-xs font-semibold leading-tight text-foreground">
                        {getCategoryLabel(name)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section aria-label="Why shop with us" className="border-b border-border bg-card">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-3 lg:py-10">
          {VALUE_PROPS.map((prop) => (
            <li key={prop.title} className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                <FontAwesomeIcon icon={prop.icon} className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-card-foreground">{prop.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Catalogue */}
      <ProductList categories={categories} {...catalogProps} />
    </>
  );
}

export default Home;
