
import "./HeroBanner.css";

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Your hiring workspace</h1>

          <p>
            Manage hiring actions. Keep progress moving.
          </p>

          <div className="hero-actions">
            <button
              type="button"
              className="hero-btn hero-btn-primary"
              onClick={() => alert("New Hiring Action to be implemented yet")}
            >
              <span className="hero-plus" aria-hidden="true">
                +
              </span>
              New Hiring Action
            </button>

            <button
              type="button"
              className="hero-btn hero-btn-secondary"
              onClick={() => alert("View Hiring Actions to be implemented yet")}
            >
              View Hiring Actions
            </button>
          </div>
        </div>

        <div className="hero-logo">
          <span className="hero-logo-oit">OIT</span>

          <span className="hero-logo-divider" />

          <span className="hero-logo-text">
            Office of
            <br />
            Information
            <br />
            Technology
          </span>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
