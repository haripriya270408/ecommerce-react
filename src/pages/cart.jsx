import { Link } from "react-router-dom";

function Cart({ cart, removeFromCart }) {
  return (
    <main className="container page-section">
      <section className="glass-panel page-hero">
        <p className="eyebrow">Cart</p>
        <h1>Your selected products are ready to review.</h1>
        <p>
          Keep the cart experience simple, clear, and consistent with the rest
          of the storefront.
        </p>
      </section>

      {cart.length === 0 ? (
        <section className="glass-panel empty-state">
          <h3>Your cart is empty</h3>
          <p>Start with the shop and add products you want to buy.</p>
          <Link to="/shop" className="glass-button">
            Browse products
          </Link>
        </section>
      ) : (
        <section className="saved-list">
          {cart.map((item) => (
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
                  className="glass-button secondary-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Cart;
