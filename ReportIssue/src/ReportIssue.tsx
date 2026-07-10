import React from "react";
import {  DefaultButton, Dropdown, Icon, Label, PrimaryButton, TextField, initializeIcons } from "@fluentui/react";
import "./index.css";

const recordTypeOptions = [
  { key: "Application", text: "Application", data: { icon: "AppIconDefault" } },
  { key: "Database", text: "Database" },
  { key: "Service", text: "Service" },
];

const issueCategoryOptions = [
  { key: "1", text: "General" },
  { key: "2", text: "Accounts" },
  { key: "3", text: "Assigned People" },
  { key: "4", text: "Application Notes" },
  { key: "5", text: "Component Notes" },
  { key: "6", text: "Inquiry Notes" },
  { key: "7", text: "Application URLs" },
  { key: "8", text: "JIRA Tickets" },
];

const fieldOptions = [
  { key: "1", text: "Details" },
  { key: "2", text: "Hosting Details" },
  { key: "3", text: "Business & System Owners" },
];

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label>
      {children}
      <span className="required">*</span>
    </Label>
  );
}

export default function ReportIssue() {
    initializeIcons();
  return (
    <div className="report-page">
      <div className="report-header">
        <div className="report-header-icon">
          <Icon iconName="Flag" />
        </div>

        <div>
          <h1 className="report-title">Report an Issue</h1>
          <div className="report-subtitle">
            Help us keep data accurate and reliable. Report incorrect or outdated
            information on this record.
          </div>
        </div>
      </div>

      <div className="report-card">
        <div className="section-title">1. Issue Details</div>

        <div className="form-grid">
          
          <div>
            <RequiredLabel>Tab with Issue</RequiredLabel>
            <Dropdown selectedKey="1" options={issueCategoryOptions} />
          </div>

          <div>
            <RequiredLabel>Section with Issue</RequiredLabel>
            <Dropdown selectedKey="1" options={fieldOptions} />
          </div>

          <div className="full-width">
            <RequiredLabel>Issue Description</RequiredLabel>
            <div className="textarea-wrap">
              <TextField
                multiline
                rows={3}
                defaultValue="The application owner is incorrect. It should be John Smith instead of Jane Doe."
              />
              <span className="counter">85/2000</span>
            </div>
          </div>
        </div>

        <div className="form-grid">
          <div>
            <Label>Your Name</Label>
            <TextField defaultValue={(parent as any).Xrm.Utility.getGlobalContext().userSettings.userName} />
          </div>

          <div>
            <Label>Email</Label>
            <TextField />
          </div>
        </div>
      </div>

      <div className="report-footer">
        <DefaultButton text="Cancel" className="cancel-button" />
        <PrimaryButton
          text="Submit Issue"
          iconProps={{ iconName: "Send" }}
          className="submit-button"
        />
      </div>
    </div>
  );
}