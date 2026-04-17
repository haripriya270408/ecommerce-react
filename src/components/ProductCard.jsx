const ProductCard = ({ product, addToCart, cart, wishlist, toggleWishlist, isHighlighted }) => {
  const isInCart = cart.some((item) => item.id === product.id);
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <article
      className={`product-card ${isHighlighted ? "product-card-highlighted" : ""}`}
      id={`product-card-${product.id}`}
    >
      <div className="product-card-media">
        <img src={product.image} alt={product.title} />
        <button
          type="button"
          className={`wishlist-chip ${isInWishlist ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
        >
          {isInWishlist ? "Saved" : "Wishlist"}
        </button>
      </div>

      <div className="product-card-body">
        <div className="product-card-topline">
          <span className="product-category">{product.category}</span>
          <span className="product-price">Rs. {product.price}</span>
        </div>

        <h3>{product.title}</h3>
        <p>{product.description}</p>

        <div className="product-card-actions">
          <button
            type="button"
            className="glass-button"
            onClick={() => addToCart(product)}
            disabled={isInCart}
          >
            {isInCart ? "In cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
