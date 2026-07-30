import * as React from "react";
import { Stack, Text, PrimaryButton, Icon, mergeStyleSets } from "@fluentui/react";

/**
 * DataDiscrepancyModal
 *
 * Body content for the success confirmation shown after a user submits a
 * "Report Data Discrepancy" form. Assumes it is rendered inside an existing
 * Fluent UI Panel/Modal shell that already provides the header (title +
 * close/expand icons), so no header is included here.
 *
 * Built with Fluent UI v8 (@fluentui/react) only.
 */
export interface AlertProps {
  /** Called when the user clicks the primary button */
  onGoToApplication?: () => void;
  /** The site/coordinator identifier (e.g. "1115 PMDA") */
  siteName?: string;
}

const classNames = mergeStyleSets({
  container: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  },
  body: {
    padding: "32px 24px",
  },
  successIconWrap: {
    width: 56,
    height: 56,
    minWidth: 56,
    borderRadius: "50%",
    border: "2px solid #107C10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  successIcon: {
    fontSize: 28,
    color: "#107C10",
  },
  thankYou: {
    fontSize: 24,
    fontWeight: 700,
    color: "#107C10",
  },
  submittedText: {
    fontSize: 17,
    fontWeight: 700,
    color: "#004E8C",
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
    fontSize: 18,
    color: "#107C10",
  },
  infoText: {
    fontSize: 14,
    color: "#323130",
  },
  siteName: {
    fontWeight: 600,
    color: "#0B6A0B",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #EDEBE9",
    margin: "24px 0",
  },
  emailRow: {
    fontSize: 14,
    color: "#605E5C",
  },
  mailIcon: {
    fontSize: 18,
    color: "#004E8C",
  },
  ctaButton: {
    backgroundColor: "#004E8C",
    borderColor: "#004E8C",
  },
});

export default function Alert({
  onGoToApplication = () => {},
  siteName = "",
}: AlertProps) {
  return (
    <Stack className={classNames.container}>
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
              <span className={classNames.siteName}>{siteName}</span> has
              been notified and will review the fields you flagged.
            </Text>
            <Text className={classNames.infoText} block>
              You will be notified of any updates.
            </Text>
          </Stack>
        </Stack>

        <hr className={classNames.divider} />

        {/* Confirmation email + CTA */}
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
          tokens={{ childrenGap: 16 }}
          wrap
        >
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Icon iconName="Mail" className={classNames.mailIcon} />
            <Text className={classNames.emailRow}>
              A confirmation email has been sent to you.
            </Text>
          </Stack>
          <PrimaryButton
            className={classNames.ctaButton}
            onClick={onGoToApplication}
            iconProps={{ iconName: "Home" }}
            text="Go to Application"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}