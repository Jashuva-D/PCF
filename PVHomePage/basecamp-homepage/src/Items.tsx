import * as React from "react";
import {
  Stack,
  Text,
  mergeStyleSets,
  IStackTokens,
} from "@fluentui/react";

type SummaryCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  dotColor: string;
};

const styles = mergeStyleSets({
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    width: "100%",
    boxSizing: "border-box",

    selectors: {
      "@media (max-width: 900px)": {
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      },

      "@media (max-width: 520px)": {
        gridTemplateColumns: "1fr",
      },
    },
  },

  card: {
    position: "relative",
    minHeight: "100px",
    boxSizing: "border-box",

    backgroundColor: "#FFFFFF",
    border: "1px solid #E1E1E1",
    borderRadius: "10px",
    padding: "16px",

    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
  },

  title: {
    display: "block",
    color: "#6B6B6B",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400,
  },

  value: {
    display: "block",
    color: "#242424",
    fontSize: "24px",
    lineHeight: "28px",
    fontWeight: 600,
  },

  subtitle: {
    display: "block",
    color: "#0078D4",
    fontSize: "12px",
    lineHeight: "16px",
  },

  dot: {
    position: "absolute",
    right: "16px",
    top: "44px",
    width: "13px",
    height: "13px",
    borderRadius: "50%",
  },
});

const cardTokens: IStackTokens = {
  childrenGap: 4,
};

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  dotColor,
}) => {
  return (
    <div className={styles.card}>
      <Stack tokens={cardTokens}>
        <Text className={styles.title}>
          {title}
        </Text>

        <Text className={styles.value}>
          {value}
        </Text>

        <Text className={styles.subtitle}>
          {subtitle}
        </Text>
      </Stack>

      <span
        className={styles.dot}
        style={{ backgroundColor: dotColor }}
        aria-hidden="true"
      />
    </div>
  );
};

export const ApplicationSummaryCards: React.FC = () => {
  return (
    <div className={styles.container}>
      <SummaryCard
        title="Total applications"
        value={24}
        subtitle="+2 this month"
        dotColor="#12B8DD"
      />

      <SummaryCard
        title="Need attention"
        value={3}
        subtitle="Owner or stage update"
        dotColor="#9A6A0B"
      />

      <SummaryCard
        title="In onboarding"
        value={6}
        subtitle="4 on track"
        dotColor="#0078D4"
      />

      <SummaryCard
        title="Go-Live applications"
        value={1}
        subtitle="Currently in Go-Live"
        dotColor="#107C10"
      />
    </div>
  );
};