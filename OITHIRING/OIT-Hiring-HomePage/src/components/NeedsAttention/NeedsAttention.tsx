
import "./NeedsAttention.css";

interface AttentionItem {
  id: string;
  title: string;
  description: string;
}

const attentionItems: AttentionItem[] = [
  {
    id: "milestones",
    title: "Missing milestone dates",
    description: "Find hiring actions with incomplete milestone dates.",
  },
  {
    id: "updates",
    title: "Review pending updates",
    description: "See hiring actions with recent updates that need your review.",
  },
  {
    id: "aging",
    title: "Check aging hiring actions",
    description:
      "Find hiring actions that have been in their current stage for an extended time.",
  },
];

function AttentionIcon({ type }: { type: string }) {
  switch (type) {
    case "milestones":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M7 3v4M17 3v4M3 10h18" />
          <path d="M12 13v3M12 18h.01" />
        </svg>
      );
    case "updates":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 11a8 8 0 1 1-2.3-5.7" />
          <path d="M20 4v6h-6" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "aging":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l4 2" />
          <path d="M8 2h8" />
        </svg>
      );
    default:
      return null;
  }
}

function NeedsAttention() {
  const handleClick = (item: AttentionItem) => {
    alert(`${item.title} navigation to be implemented yet`);
  };

  return (
    <section className="needs-attention">
      <div className="needs-attention-header">
        <h2>Needs attention</h2>
      </div>

      <div className="needs-attention-list">
        {attentionItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="needs-attention-item"
            onClick={() => handleClick(item)}
          >
            <span className={`needs-attention-icon needs-attention-icon-${item.id}`}>
              <AttentionIcon type={item.id} />
            </span>

            <span className="needs-attention-content">
              <span className="needs-attention-title">{item.title}</span>
              <span className="needs-attention-description">
                {item.description}
              </span>
            </span>

            <svg
              className="needs-attention-chevron"
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
      </div>
    </section>
  );
}

export default NeedsAttention;
