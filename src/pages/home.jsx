import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Minimal style. Maximum presence.</p>
            <h1>Build a wardrobe that looks quietly luxurious.</h1>
            <p className="hero-text">
              Discover elevated essentials, modern accessories, and everyday
              pieces chosen for clean design and bold visual character.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="hero-btn primary">
                Explore shop 
              </Link>
              <Link to="/about" className="hero-btn secondary">
                About the store
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-story-section">
        <div className="container home-story-content">
          <div className="section-heading section-heading-light">
            <p className="eyebrow">Store direction</p>
            <h2>Minimal, dark, and calmer below the hero so the page feels balanced.</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <article className="glass-panel info-card info-card-dark">
                <h3>Curated selection</h3>
                <p>
                  A smaller collection with stronger visual hierarchy so every
                  product gets room to stand out.
                </p>
              </article>
            </div>
            <div className="col-md-4">
              <article className="glass-panel info-card info-card-dark">
                <h3>Better flow</h3>
                <p>
                  The landing page now leads into a darker section instead of
                  overlapping awkwardly with bright cards.
                </p>
              </article>
            </div>
            <div className="col-md-4">
              <article className="glass-panel info-card info-card-dark">
                <h3>Glass details</h3>
                <p>
                  Buttons and panels still keep the soft glass effect, but with
                  more contrast and cleaner spacing.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
