
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
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M2 19v-2c0-3 3-5 7-5s7 2 7 5v2H2Z" />
          <path d="M17 13c3 0 5 2 5 5v1h-4v-2c0-1.5-.4-2.8-1-4Z" />
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
