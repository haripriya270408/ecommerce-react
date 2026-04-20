import { useState } from "react";

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // 🔒 Validation
    if (!email || !query || !category) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    // ⏳ Loading simulation
    setLoading(true);

    setTimeout(() => {
      const formData = {
        email,
        query,
        category,
        date: new Date().toISOString(),
      };

      // 💾 Store in localStorage
      const existing =
        JSON.parse(localStorage.getItem("queries")) || [];
      localStorage.setItem(
        "queries",
        JSON.stringify([...existing, formData])
      );

      setLoading(false);
      setIsSubmitted(true);

      // reset fields
      setEmail("");
      setQuery("");
      setCategory("");
    }, 1000);
  };

  return (
    <main className="container page-section">
      <section className="glass-panel page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Have a question about an order, product, or collaboration?</h1>
        <p>
          Reach out through the form below and we will respond with the same
          calm, premium experience the storefront is built around.
        </p>
      </section>

      <section className="contact-layout">
        <aside className="glass-panel contact-sidebar">
          <p className="eyebrow">Support</p>
          <h2>Let us make it easy to reach the store.</h2>

          <div className="contact-note-list">
            <article className="contact-note-card">
              <h3>Email support</h3>
              <p>Best for product questions, order help, or brand enquiries.</p>
            </article>

            <article className="contact-note-card">
              <h3>Fast response</h3>
              <p>Messages are designed to feel personal, clear, and helpful.</p>
            </article>

            <article className="contact-note-card">
              <h3>Design-first touch</h3>
              <p>The contact page now matches the storefront instead of feeling plain.</p>
            </article>
          </div>
        </aside>

        <section className="glass-panel contact-form-shell">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">

              {/* Category */}
              <div className="mb-4">
                <label className="form-label">Query Type</label>
                <select
                  className="form-select glass-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="order">Order Issue</option>
                  <option value="product">Product Question</option>
                  <option value="collab">Collaboration</option>
                </select>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control glass-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Query */}
              <div className="mb-4">
                <label htmlFor="query" className="form-label">
                  Query
                </label>
                <textarea
                  id="query"
                  className="form-control glass-input"
                  rows="6"
                  placeholder="Tell us how we can help."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Smart hint */}
            {query.toLowerCase().includes("refund") && (
              <p className="contact-helper-text">
                You might want to check our refund policy.
              </p>
            )}

            <div className="contact-form-footer">
              <button
                type="submit"
                className="glass-button"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send query"}
              </button>

              {isSubmitted ? (
                <p className="form-feedback">
                  ✅ Your query has been received. A confirmation would be sent to{" "}
                  <strong>{email || "your email"}</strong>.
                </p>
              ) : (
                <p className="contact-helper-text">
                  Share your email and a short message and the system will record it instantly.
                </p>
              )}
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

export default Contact;