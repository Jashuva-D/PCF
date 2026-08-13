import * as React from "react";
import { Stack, Text, PrimaryButton, Icon, mergeStyleSets, FontSizes } from "@fluentui/react";

export interface AlertProps {
  onGoToApplication?: () => void;
  siteName?: string;
}

const classNames = mergeStyleSets({
  body: {
    maxWidth: "80%",
    margin: "0 auto",
    paddingTop: 80
  },
  successIconWrap: {
    width: 28,
    height: 28,
    minWidth: 28,
    borderRadius: "50%",
    border: "2px solid #107C10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 0 10px #DFF6DD",
    backgroundColor: "#DFF6DD",
  },
  successIcon: {
    fontSize: 14,
    color: "#107C10",
  },
  thankYou: {
    fontSize: 20,
    fontWeight: 700,
    color: "#107C10",
  },
  submittedText: {
    fontSize: 15,
    fontWeight: 700,
    color: "#0D2499",
  },
  infoPanel: {
    backgroundColor: "#F1FAF1",
    borderRadius: 10,
    padding: 20,
  },
  infoIconWrap: {
    width: 36,
    height: 36,
    minWidth: 36,
    borderRadius: "50%",
    backgroundColor: "#DFF6DD",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  infoIcon: {
    fontSize: 24,
    color: "#107C10",
  },
  infoText: {
    fontSize: 16,
    color: "#323130",
  },
  siteName: {
    fontWeight: 600,
    color: "#0B6A0B",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #EDEBE9",
    margin: "5px 0",
  },
  emailRow: {
    fontSize: 16,
    color: "#605E5C",
    fontWeight: 600
  },
  mailIcon: {
    fontSize: 24,
    color: "#0D2499",
  },
  ctaButton: {
    backgroundColor: "#0D2499",
    borderColor: "#0D2499",
    borderRadius: 6,
    alignItems: "center",
    
  },
});

export default function Alert({
  onGoToApplication = () => {},
  siteName = "",
}: AlertProps) {
  return (
    <Stack
    horizontalAlign="center"
    verticalAlign="center"
    verticalFill
    styles={{
      root: {
        width: "100%",
        height: "100%",
      },
    }}
  >
    <Stack className={classNames.body} tokens={{ childrenGap: 24 }}>
      <Stack className={classNames.body} tokens={{ childrenGap: 24 }}>
      {/* Success icon + heading */}
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ childrenGap: 16 }}
        wrap
      >
        <Stack className={classNames.successIconWrap}>
          <Icon iconName="CheckMark" className={classNames.successIcon} />
        </Stack>
        <Stack tokens={{ childrenGap: 2 }}>
          <Text className={classNames.thankYou} block>
            Thank You!
          </Text>
          <Text className={classNames.submittedText} block>
            Data Discrepancy Submitted Successfully
          </Text>
        </Stack>
      </Stack>

      {/* Info panel */}
      <Stack
        horizontal
        className={classNames.infoPanel}
        tokens={{ childrenGap: 16 }}
      >
        <Stack className={classNames.infoIconWrap}>
          <Icon iconName="Contact" className={classNames.infoIcon} />
        </Stack>
        <Stack tokens={{ childrenGap: 12 }}>
          <Text className={classNames.infoText} block>
            The Hosting Coordinator for{" "}
            <span className={classNames.siteName}>{siteName}</span> has been
            notified and will review the fields you flagged.
          </Text>
          <Text className={classNames.infoText} block>
            You will be notified of any updates.
          </Text>
        </Stack>
      </Stack>

      {/* Confirmation email + CTA */}
      <Stack className={classNames.divider} />
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Icon iconName="Mail" className={classNames.mailIcon} />
          <Text className={classNames.emailRow}>
            A confirmation has been sent to you via Email and Teams.
          </Text>
        </Stack>
        <Stack horizontalAlign = "end" verticalAlign="end" horizontal>
          <PrimaryButton
              iconProps={{iconName: "home"}}
              text="Go to Summary"
              onClick={onGoToApplication}
              styles={{
                  icon: {
                    fontSize: 20
                  },
                  textContainer: {
                    fontSize: 16
                  },
                  root: {
                      backgroundColor: "#0D2499",
                      borderColor: "#0D2499",
                      borderRadius: 6,
                  },
                  rootHovered: {
                      backgroundColor: "#5f74e1",
                      borderColor: "#5f74e1",
                  },
                  rootPressed: {
                      backgroundColor: "#0A1B73",
                      borderColor: "#0A1B73",
                  },
                  rootFocused: {
                      backgroundColor: "#0D2499",
                      borderColor: "#0D2499",
                  },
              }}
              style= {{ padding: 10}}
          />
        </Stack>
    </Stack>
    </Stack>
  </Stack>
    
  );
}

//5f74e1