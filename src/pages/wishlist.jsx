import { Link } from "react-router-dom";

function Wishlist({ wishlist, toggleWishlist, addToCart, cart }) {
  return (
    <main className="container page-section">
      <section className="glass-panel page-hero">
        <p className="eyebrow">Wishlist</p>
        <h1>Your saved pieces live here for later.</h1>
        <p>
          Keep track of products you love, then move them to cart whenever you
          are ready.
        </p>
      </section>

      {wishlist.length === 0 ? (
        <section className="glass-panel empty-state">
          <h3>Your wishlist is empty</h3>
          <p>Browse the shop and save the pieces that catch your eye.</p>
          <Link to="/shop" className="glass-button">
            Go to shop
          </Link>
        </section>
      ) : (
        <section className="saved-list">
          {wishlist.map((item) => {
            const isInCart = cart.some((cartItem) => cartItem.id === item.id);

            return (
              <article className="glass-panel saved-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="saved-item-copy">
                  <span className="product-category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="saved-item-actions">
                  <span className="product-price">Rs. {item.price}</span>
                  <button
                    type="button"
                    className="glass-button"
                    disabled={isInCart}
                    onClick={() => addToCart(item)}
                  >
                    {isInCart ? "In cart" : "Add to cart"}
                  </button>
                  <button
                    type="button"
                    className="glass-button secondary-button"
                    onClick={() => toggleWishlist(item)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Wishlist;
