import { useState } from "react";

function Checkout({ cart, setCart }) {
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [placed, setPlaced] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrder = () => {
    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    if (!payment) {
      alert("Please select payment method");
      return;
    }

    setCart([]);
    setPlaced(true);
  };

  return (
    <main className="container page-section">
      <section className="glass-panel page-hero">
        <p className="eyebrow">Checkout</p>
        <h1>Confirm your order</h1>
      </section>

      {placed ? (
        <section className="glass-panel empty-state">
          <h3>🎉 Order placed successfully!</h3>
          <p>Payment mode: <strong>{payment}</strong></p>
        </section>
      ) : (
        <div className="row g-4">

          {/* Address */}
          <div className="col-lg-6">
            <section className="glass-panel">
              <h3>Delivery Address</h3>
              <textarea
                className="form-control glass-input"
                rows="4"
                placeholder="Enter full address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </section>

            {/* Payment */}
            <section className="glass-panel mt-3">
              <h3>Payment Method</h3>

              <div className="form-check">
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label> UPI</label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  name="payment"
                  value="Card"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label> Credit / Debit Card</label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <label> Cash on Delivery</label>
              </div>
            </section>
          </div>

          {/* Bill */}
          <div className="col-lg-6">
            <section className="glass-panel">
              <h3>Bill Summary</h3>

              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.title}</span>
                  <span>Rs. {item.price}</span>
                </div>
              ))}

              <hr />
              <h4>Total: Rs. {total}</h4>

              <button
                className="glass-button mt-3"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}

export default Checkout;