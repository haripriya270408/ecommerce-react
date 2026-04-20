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

  // ✅ FILTER + SEARCH + SORT
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
      results.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      results.sort((a, b) => b.price - a.price);
    } else if (sortOption === "a-z") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [category, maxPrice, minPrice, search, sortOption]);

  // ✅ Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, minPrice, maxPrice, sortOption]);

  const featuredProducts = productsData.slice(0, 8);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  );

  // ✅ Smooth scroll to product
  useEffect(() => {
    if (!focusedProductId) return;

    const activeProduct = currentProducts.some(
      (p) => p.id === focusedProductId
    );

    if (!activeProduct) return;

    const scroll = setTimeout(() => {
      document
        .getElementById(`product-card-${focusedProductId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);

    const clear = setTimeout(() => {
      setFocusedProductId(null);
    }, 2000);

    return () => {
      clearTimeout(scroll);
      clearTimeout(clear);
    };
  }, [currentProducts, focusedProductId]);

  // ✅ Jump from carousel
  const jumpToProduct = (productId) => {
    const index = filteredProducts.findIndex((p) => p.id === productId);
    if (index === -1) return;

    const page = Math.floor(index / itemsPerPage) + 1;
    setFocusedProductId(productId);
    setCurrentPage(page);
  };

  return (
    <main className="container page-section">
      {/* HEADER */}
      <section className="shop-header glass-panel">
        <div>
          <p className="eyebrow">Shop</p>
          <h1>All products in one clean, searchable view.</h1>
        </div>
        <p className="shop-summary">
          Use the search bar, filters, and sorting controls to browse the full collection.
        </p>
      </section>

      {/* FEATURED CAROUSEL */}
      <section className="featured-carousel-shell">
        <div className="featured-carousel-track">
          {[...featuredProducts, ...featuredProducts].map((product, i) => (
            <button
              key={`${product.id}-${i}`}
              className="featured-carousel-card"
              onClick={() => jumpToProduct(product.id)}
            >
              <img src={product.image} alt={product.title} />
              <div className="featured-carousel-copy">
                <span>{product.category}</span>
                <h3>{product.title}</h3>
                <span>₹ {product.price}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FILTERS */}
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

      {/* RESULTS */}
      <section className="results-bar">
        <p>
          Showing <strong>{currentProducts.length}</strong> of{" "}
          <strong>{filteredProducts.length}</strong>
        </p>
      </section>

      {/* PRODUCT GRID */}
      <section className="row g-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              className="col-xl-4 col-md-6"
              key={product.id}
              id={`product-card-${product.id}`}
            >
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
            </div>
          </div>
        )}
      </section>

      {/* PAGINATION */}
      <section className="pagination-shell">
        <button
          className="glass-button secondary-button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </button>

        <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="glass-button secondary-button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </section>
    </main>
  );
}

export default Shop;