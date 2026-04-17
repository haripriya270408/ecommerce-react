function About() {
  return (
    <main className="container page-section">
      <section className="glass-panel page-hero">
        <p className="eyebrow">About</p>
        <h1>Veloura is a concept store built around clean essentials.</h1>
        <p>
          This store is designed for shoppers who like modern styling, calm
          layouts, and a carefully edited collection instead of a crowded
          marketplace. Every part of the interface aims to feel refined,
          lightweight, and easy to explore.
        </p>
      </section>

      <section className="row g-4">
        <div className="col-lg-6">
          <article className="glass-panel detail-card">
            <h2>Our idea</h2>
            <p>
              Blend minimal design with standout visuals so the storefront feels
              premium without becoming loud or heavy.
            </p>
          </article>
        </div>
        <div className="col-lg-6">
          <article className="glass-panel detail-card">
            <h2>What we focus on</h2>
            <p>
              Fashion, accessories, and tech-forward essentials that work well
              together and fit a polished everyday lifestyle.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default About;
