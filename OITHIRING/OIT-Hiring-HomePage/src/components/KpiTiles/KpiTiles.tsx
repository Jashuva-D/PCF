
import "./KpiTiles.css";

type IconType = "total" | "pending" | "attention" | "date";

interface KpiTileData {
  id: IconType;
  title: string;
  value: number;
}

const tiles: KpiTileData[] = [
  { id: "total", title: "Total Hiring Actions", value: 229 },
  { id: "pending", title: "Pending Updates", value: 16 },
  { id: "attention", title: "Requiring BOG Attention", value: 12 },
  { id: "date", title: "Effective Date Set", value: 34 },
];

function KpiIcon({ type }: { type: IconType }) {
  switch (type) {
    case "total":
      return (
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
          <path d="M14 3v5h5M9 12h6M9 16h6" />
        </svg>
      );

    case "pending":
      return (
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v6l4 3" />
        </svg>
      );

    case "attention":
        return (
            <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            >
            <circle cx="12" cy="7" r="3.3" />
            <circle cx="4.8" cy="9" r="2.6" />
            <circle cx="19.2" cy="9" r="2.6" />

            <path d="M4.8 12.5C2.2 12.5 1 14.6 1 17.2V19H5.5V17.5C5.5 15.7 6 14.3 7 13.2C6.3 12.7 5.6 12.5 4.8 12.5Z" />

            <path d="M19.2 12.5C21.8 12.5 23 14.6 23 17.2V19H18.5V17.5C18.5 15.7 18 14.3 17 13.2C17.7 12.7 18.4 12.5 19.2 12.5Z" />

            <path d="M12 11.5C8.2 11.5 6 14.2 6 17.5V20H18V17.5C18 14.2 15.8 11.5 12 11.5Z" />
            </svg>
        );

    case "date":
      return (
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      );
  }
}

function KpiTiles() {
  return (
    <section className="kpi-tiles" aria-label="Hiring statistics">
      {tiles.map((tile) => (
        <button
          key={tile.id}
          type="button"
          className={`kpi-tile kpi-tile--${tile.id}`}
          onClick={() =>
            alert(`${tile.title} navigation to be implemented yet`)
          }
        >
          <span className="kpi-tile-icon">
            <KpiIcon type={tile.id} />
          </span>

          <span className="kpi-tile-content">
            <span className="kpi-tile-value">{tile.value}</span>
            <span className="kpi-tile-title">{tile.title}</span>
          </span>

          <svg
            className="kpi-tile-arrow"
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

export default KpiTiles;
