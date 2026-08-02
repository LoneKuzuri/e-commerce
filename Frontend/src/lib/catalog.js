import {
  faBowlRice,
  faBoxOpen,
  faBottleWater,
  faCandyCane,
  faEgg,
  faJar,
  faLeaf,
  faMugHot,
  faOilCan,
  faPumpSoap,
  faSeedling,
  faSoap,
  faWheatAwn,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Icon + tint for each known category. Keys are matched case-insensitively,
 * and a few backend slugs are aliased onto the same visual identity.
 */
const CATEGORY_META = {
  rice: { icon: faBowlRice, tint: "amber" },
  "chamal-and-chiuras": { icon: faBowlRice, tint: "amber", label: "Rice & Chiura" },
  daal: { icon: faSeedling, tint: "green" },
  daals: { icon: faSeedling, tint: "green", label: "Lentils" },
  aata: { icon: faWheatAwn, tint: "amber" },
  oil: { icon: faOilCan, tint: "amber" },
  oils: { icon: faOilCan, tint: "amber", label: "Oil" },
  beverages: { icon: faBottleWater, tint: "sky" },
  noodles: { icon: faBoxOpen, tint: "rose" },
  soap: { icon: faSoap, tint: "sky" },
  surf: { icon: faPumpSoap, tint: "sky" },
  chiyapatti: { icon: faMugHot, tint: "green" },
  icepop: { icon: faCandyCane, tint: "rose" },
  egg: { icon: faEgg, tint: "amber" },
  spices: { icon: faJar, tint: "rose" },
  vegetables: { icon: faLeaf, tint: "green" },
};

const FALLBACK = { icon: faBoxOpen, tint: "neutral" };

/** Tailwind classes for each tint, kept static so the JIT compiler can see them. */
export const TINT_CLASSES = {
  amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400",
  green: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400",
  sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-400",
  rose: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400",
  neutral: "bg-muted text-muted-foreground",
};

/** Look up the icon + tint for a category name. */
export const getCategoryMeta = (category) => {
  if (!category) return FALLBACK;
  return CATEGORY_META[String(category).toLowerCase()] || FALLBACK;
};

/** Human-friendly category label, with slug aliases resolved. */
export const getCategoryLabel = (category) => {
  if (!category) return "Uncategorized";
  const meta = CATEGORY_META[String(category).toLowerCase()];
  if (meta?.label) return meta.label;
  return category.charAt(0).toUpperCase() + category.slice(1);
};

/** Format a number as Nepali rupees, e.g. "Rs. 1,250". */
export const formatPrice = (value) => `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;
