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
    color: "#01395E",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 800,
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

interface ApplicationSummaryCardProps {

}
interface ApplicationSummaryCardState {
    apps_total: number,
    apps_thismonth: number,
    apps_needattention: number,
    apps_onboarding: number,
    apps_golive: number
}


export class ApplicationSummaryCards extends React.Component<ApplicationSummaryCardProps,ApplicationSummaryCardState> {
    constructor(props: ApplicationSummaryCardProps){
        super(props);
        this.state = {
            apps_total: 0,
            apps_thismonth: 0,
            apps_needattention: 0,
            apps_onboarding: 0,
            apps_golive: 0
        }
    }
    componentDidMount(): void {
        var obj = this;
        (parent as any).Xrm.WebApi.retrieveMultipleRecords("pv_apps").then(function(resp: any){
            debugger;
            obj.setState({
                apps_total: resp.entities.length,
                apps_thismonth: resp.entities.filter((x: any) => { const date = new Date(x.createdon); return date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();}).length,
                apps_golive: resp.entities.filter((x: any) => { x.pv_applicationlivestatus == true})
            })
        },function(err: any){debugger;})
    }

    render(): React.ReactNode {
       
        return (
            <div className={styles.container}>
            <SummaryCard
                title="Total applications"
                value={this.state.apps_total}
                subtitle= {`+${this.state.apps_thismonth.toString()} this month`}
                dotColor="#12B8DD"
            />

            <SummaryCard
                title="Need attention"
                value={this.state.apps_needattention}
                subtitle="Owner or stage update"
                dotColor="#9A6A0B"
            />

            <SummaryCard
                title="In onboarding"
                value={this.state.apps_onboarding}
                subtitle="4 on track"
                dotColor="#0078D4"
            />

            <SummaryCard
                title="Go-Live applications"
                value={this.state.apps_golive}
                subtitle=""
                dotColor="#107C10"
            />
            </div>
        );
    }
  
};