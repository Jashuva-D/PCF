
import "./NavigationCards.css";

type NavigationCardType = "dashboard" | "aids" | "support";

interface NavigationCard {
  id: NavigationCardType;
  title: string;
  description: string;
}

const navigationCards: NavigationCard[] = [
  {
    id: "dashboard",
    title: "Hiring Dashboard",
    description: "Explore hiring trends and metrics.",
  },
  {
    id: "aids",
    title: "Job Aids",
    description: "Guides for managing hiring actions.",
  },
  {
    id: "support",
    title: "Support",
    description: "Get help from the project team.",
  },
];

function NavigationIcon({ type }: { type: NavigationCardType }) {
  switch (type) {
    case "dashboard":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 9v12" />
          <path d="M12 17l3-3 2 2 3-4" />
        </svg>
      );

    case "aids":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          <path d="M9 7h7M9 11h7" />
        </svg>
      );

    case "support":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" />
          <path d="M12 17h.01" />
        </svg>
      );
  }
}

function NavigationCards() {
  const handleNavigation = (card: NavigationCard) => {
    alert(`${card.title} navigation to be implemented yet`);
  };

  return (
    <section className="navigation-cards">
      {navigationCards.map((card) => (
        <button
          key={card.id}
          type="button"
          className="navigation-card"
          onClick={() => handleNavigation(card)}
        >
          <span
            className={`navigation-card-icon navigation-card-icon-${card.id}`}
          >
            <NavigationIcon type={card.id} />
          </span>

          <span className="navigation-card-content">
            <span className="navigation-card-title">
              {card.title}
            </span>

            <span className="navigation-card-description">
              {card.description}
            </span>
          </span>

          <svg
            className="navigation-card-chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      ))}
    </section>
  );
}

export default NavigationCards;
