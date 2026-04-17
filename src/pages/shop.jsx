import { useEffect, useMemo, useState } from "react";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";

function Shop({ search, addToCart, cart, wishlist, toggleWishlist }) {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [focusedProductId, setFocusedProductId] = useState(null);
  const itemsPerPage = 6;

  const filteredProducts = useMemo(() => {
    const results = productsData
      .filter((product) =>
        `${product.title} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((product) =>
        category === "all" ? true : product.category === category
      )
      .filter((product) =>
        minPrice === "" ? true : product.price >= Number(minPrice)
      )
      .filter((product) =>
        maxPrice === "" ? true : product.price <= Number(maxPrice)
      );

    if (sortOption === "low-high") {
      results.sort((first, second) => first.price - second.price);
    } else if (sortOption === "high-low") {
      results.sort((first, second) => second.price - first.price);
    } else if (sortOption === "a-z") {
      results.sort((first, second) => first.title.localeCompare(second.title));
    }

    return results;
  }, [category, maxPrice, minPrice, search, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, minPrice, maxPrice, sortOption]);

  const featuredProducts = productsData.slice(0, 8);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (!focusedProductId) {
      return;
    }

    const activeProduct = currentProducts.some(
      (product) => product.id === focusedProductId
    );

    if (!activeProduct) {
      return;
    }

    const scrollToProduct = window.setTimeout(() => {
      document
        .getElementById(`product-card-${focusedProductId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);

    const clearHighlight = window.setTimeout(() => {
      setFocusedProductId(null);
    }, 2200);

    return () => {
      window.clearTimeout(scrollToProduct);
      window.clearTimeout(clearHighlight);
    };
  }, [currentProducts, focusedProductId]);

  const jumpToProduct = (productId) => {
    const productIndex = filteredProducts.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
      return;
    }

    const destinationPage = Math.floor(productIndex / itemsPerPage) + 1;
    setFocusedProductId(productId);
    setCurrentPage(destinationPage);
  };

  return (
    <main className="container page-section">
      <section className="shop-header glass-panel">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>All products in one clean, searchable view.</h1>
        </div>
        <p className="shop-summary">
          Use the search bar, filters, and sorting controls to browse the full
          collection. Save favorites to your wishlist or add them straight to
          cart.
        </p>
      </section>

      <section className="featured-carousel-shell" aria-label="Featured products">
        <div className="featured-carousel-track">
          {[...featuredProducts, ...featuredProducts].map((product, index) => (
            <button
              type="button"
              className="featured-carousel-card"
              key={`${product.id}-${index}`}
              onClick={() => jumpToProduct(product.id)}
            >
              <img src={product.image} alt={product.title} />
              <div className="featured-carousel-copy">
                <span className="product-category">{product.category}</span>
                <h3>{product.title}</h3>
                <span className="product-price">Rs. {product.price}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="row g-4 align-items-end">
        <div className="col-lg-8">
          <Filters
            category={category}
            setCategory={setCategory}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
        <div className="col-lg-4">
          <SortDropdown
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
      </div>

      <section className="results-bar">
        <p>
          Showing <strong>{currentProducts.length}</strong> of{" "}
          <strong>{filteredProducts.length}</strong> products
        </p>
      </section>

      <section className="row g-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div className="col-xl-4 col-md-6" key={product.id}>
              <ProductCard
                product={product}
                addToCart={addToCart}
                cart={cart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                isHighlighted={focusedProductId === product.id}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="glass-panel empty-state">
              <h3>No matching products</h3>
              <p>Try a different search term or widen the price range.</p>
            </div>
          </div>
        )}
      </section>

      <section className="pagination-shell">
        <button
          type="button"
          className="glass-button secondary-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          Previous
        </button>
        <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>
        <button
          type="button"
          className="glass-button secondary-button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next
        </button>
      </section>
    </main>
  );
}

export default Shop;
