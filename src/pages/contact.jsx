import { useState } from "react";

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

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
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setIsSubmitted(true);
            }}
          >
            <div className="contact-form-grid">
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control glass-input"
                  placeholder="you@example.com"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="query" className="form-label">
                  Query
                </label>
                <textarea
                  id="query"
                  className="form-control glass-input"
                  rows="8"
                  placeholder="Tell us how we can help."
                />
              </div>
            </div>

            <div className="contact-form-footer">
              <button type="submit" className="glass-button">
                Send query
              </button>

              {isSubmitted ? (
                <p className="form-feedback">
                  Your query has been received. We will get back to you soon.
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
