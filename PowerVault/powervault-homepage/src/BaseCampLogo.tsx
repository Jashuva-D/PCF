import * as React from "react";
import {
  PrimaryButton,
  Text,
  Stack,
  mergeStyleSets,
  IStackTokens,
} from "@fluentui/react";
import { PowerVaultIcon } from "./Icons";

const styles = mergeStyleSets({
  hero: {
    width: "100%",
    minHeight: "160px",
    boxSizing: "border-box",

    backgroundColor: "#01395E",

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    padding: "18px 36px 18px 24px",

    // Matches your screenshot:
    // square left side, rounded right side
    borderRadius: "14px 14px 14px 14px",
  },

  content: {
    flex: "1 1 auto",
    maxWidth: "760px",
  },

  eyebrow: {
    display: "block",
    color: "#13BFEA",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 600,
    letterSpacing: "0.4px",
    textTransform: "uppercase",
  },

  title: {
    display: "block",
    color: "#FFFFFF",
    fontSize: "23px",
    lineHeight: "30px",
    fontWeight: 700,
  },

  description: {
    display: "block",
    color: "#C7D8E5",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 400,
  },

  button: {
    minWidth: "145px",
    height: "38px",

    selectors: {
      ".ms-Button-flexContainer": {
        height: "100%",
      },

      ".ms-Button-label": {
        fontWeight: 600,
      },
    },
  },

  iconContainer: {
    width: "120px",
    minWidth: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "32px",
  },

  icon: {
    width: "92px",
    height: "92px",
    display: "block",
  },
});

const contentTokens: IStackTokens = {
  childrenGap: 6,
};

export const PowerVaultHero: React.FC = () => {
  const handleAddNewIntake = (): void => {
    //(parent as any).Xrm.Navigation.openUrl("https://powervault.powerappsportals.us/Intake-Form/");
    window.open("https://powervault.powerappsportals.us/Intake-Form/", "_blank");
  };

  return (
    <div className={styles.hero}>

      {/* Left Content */}
      <Stack
        className={styles.content}
        tokens={contentTokens}
      >
        <Text className={styles.eyebrow}>
          POWER PLATFORM OPERATIONS
        </Text>

        <Text
          variant="xLarge"
          className={styles.title}
        >
          Your secure command center for every application.
        </Text>

        <Text className={styles.description}>
          Monitor ownership, hosting, delivery stage, and governance
          from one trusted workspace.
        </Text>

        <Stack horizontal>
          <PrimaryButton
            text="Add New Intake"
            className={styles.button}
            onClick={handleAddNewIntake}
            styles={{
              root: {
                backgroundColor: "#0B7BC1",
                borderColor: "#0B7BC1",
                borderRadius: "6px",
              },

              rootHovered: {
                backgroundColor: "#096AA6",
                borderColor: "#096AA6",
              },

              rootPressed: {
                backgroundColor: "#075989",
                borderColor: "#075989",
              },

              label: {
                color: "#FFFFFF",
              },
            }}
          />
        </Stack>
      </Stack>

      {/* Right PowerVault Icon */}
      <div className={styles.iconContainer}>
        <PowerVaultIcon />
      </div>

    </div>
  );
};