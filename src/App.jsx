import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Shop from "./pages/shop";
import About from "./pages/about";
import Contact from "./pages/contact";
import Wishlist from "./pages/wishlist";
import Cart from "./pages/cart";

function App() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isDark, setIsDark] = useState(false);

  const addToCart = (product) => {
    setCart((currentCart) =>
      currentCart.some((item) => item.id === product.id)
        ? currentCart
        : [...currentCart, product]
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlist((currentWishlist) =>
      currentWishlist.some((item) => item.id === product.id)
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product]
    );
  };

  return (
    <BrowserRouter>
      <div className={`site-shell ${isDark ? "theme-dark" : "theme-light"}`}>
        <Navbar
          search={search}
          setSearch={setSearch}
          cart={cart}
          wishlist={wishlist}
          isDark={isDark}
          toggleTheme={() => setIsDark((currentMode) => !currentMode)}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              <Shop
                search={search}
                addToCart={addToCart}
                cart={cart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                cart={cart}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cart={cart} removeFromCart={removeFromCart} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
