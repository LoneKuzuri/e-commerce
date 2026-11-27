import useSWR from "swr";
import { fetchProducts, deriveCategories } from "../api/api";

/**
 * Single source of truth for the product catalogue.
 * Products are fetched once and cached by SWR; categories are derived from
 * them so the filter chips can never drift out of sync with the products.
 */
export function useCatalog() {
  const { data, error, isLoading, mutate } = useSWR("products", fetchProducts, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const products = data || [];

  return {
    products,
    categories: deriveCategories(products),
    isLoading,
    error,
    reload: mutate,
  };
}
