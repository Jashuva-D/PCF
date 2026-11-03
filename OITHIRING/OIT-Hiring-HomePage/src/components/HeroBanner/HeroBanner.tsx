
import "./HeroBanner.css";

function HeroBanner() {
  const handleNewHiringAction = () => {
    alert("New Hiring Action to be implemented yet");
  };

  const handleViewHiringActions = () => {
    alert("View Hiring Actions to be implemented yet");
  };

  return (
    <section className="hero-banner">
      <div className="hero-content">
        <h1>Your hiring workspace</h1>

        <p>Manage hiring actions. Keep progress moving.</p>

        <div className="hero-actions">
          <button
            type="button"
            className="hero-button hero-button-primary"
            onClick={handleNewHiringAction}
          >
            <span className="hero-plus">+</span>
            New Hiring Action
          </button>

          <button
            type="button"
            className="hero-button hero-button-secondary"
            onClick={handleViewHiringActions}
          >
            View Hiring Actions
          </button>
        </div>
      </div>

      <div className="hero-oit-branding">
        <span className="hero-oit-logo">OIT</span>
        <span className="hero-oit-divider" />
        <span className="hero-oit-name">
          Office of
          <span>Information</span>
          <span>Technology</span>
        </span>
      </div>
    </section>
  );
}

export default HeroBanner;
