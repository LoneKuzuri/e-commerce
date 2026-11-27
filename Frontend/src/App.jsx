import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import { useCatalog } from "./hooks/useCatalog";
import "./index.css";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const { products, categories, isLoading, error, reload } = useCatalog();

  // Scroll back to the top whenever the tab changes so each view starts fresh.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product?.id) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateCartQuantity = useCallback(
    (id, newQuantity) => {
      if (newQuantity <= 0) {
        removeFromCart(id);
        return;
      }
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setCart([]), []);

  const getCartItemQuantity = useCallback(
    (productId) => cart.find((item) => item.id === productId)?.quantity ?? 0,
    [cart]
  );

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  /** Jump to the catalogue, optionally filtered to a single category. */
  const browseCategory = useCallback((category) => {
    setSelectedCategory(category);
    setActiveTab("home");
  }, []);

  const catalogProps = {
    products,
    categories,
    isLoading,
    error,
    reload,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    updateCartQuantity,
    getCartItemQuantity,
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalItems={totalItems}
        totalPrice={totalPrice}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 pb-28 lg:pb-12">
        {activeTab === "home" && <Home {...catalogProps} onBrowseCategory={browseCategory} />}

        {activeTab === "categories" && (
          <Categories
            categories={categories}
            isLoading={isLoading}
            selectedCategory={selectedCategory}
            onBrowseCategory={browseCategory}
          />
        )}

        {activeTab === "cart" && (
          <Cart
            cart={cart}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            totalItems={totalItems}
            totalPrice={totalPrice}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "profile" && <Profile />}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={totalItems} />
    </div>
  );
}

export default App;
