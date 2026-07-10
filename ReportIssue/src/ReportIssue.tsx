import React from "react";
import {
  DefaultButton,
  Dropdown,
  Icon,
  Label,
  PrimaryButton,
  TextField,
  initializeIcons,
} from "@fluentui/react";
import "./index.css";

const recordTypeOptions = [
  { key: "Application", text: "Application", data: { icon: "AppIconDefault" } },
  { key: "Database", text: "Database" },
  { key: "Service", text: "Service" },
];

const issueCategoryOptions = [
  { key: "Incorrect Data", text: "Incorrect Data" },
  { key: "Missing Data", text: "Missing Data" },
  { key: "Duplicate Data", text: "Duplicate Data" },
];

const fieldOptions = [
  { key: "Application Owner", text: "Application Owner" },
  { key: "Application Name", text: "Application Name" },
  { key: "Status", text: "Status" },
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
            <RequiredLabel>Record Type</RequiredLabel>
            <Dropdown
              selectedKey="Application"
              options={recordTypeOptions}
              onRenderOption={(option) => (
                <div className="dropdown-option">
                  {option?.data?.icon && <Icon iconName={option.data.icon} />}
                  <span>{option?.text}</span>
                </div>
              )}
              onRenderTitle={(options) => (
                <div className="dropdown-option">
                  <Icon iconName="AppIconDefault" />
                  <span>{options?.[0]?.text}</span>
                </div>
              )}
            />
          </div>

          <div>
            <RequiredLabel>Record</RequiredLabel>
            <TextField
              defaultValue="Contoso CRM Modernization"
              iconProps={{ iconName: "Search" }}
            />
          </div>

          <div>
            <RequiredLabel>Issue Category</RequiredLabel>
            <Dropdown selectedKey="Incorrect Data" options={issueCategoryOptions} />
          </div>

          <div>
            <RequiredLabel>Field with Issue</RequiredLabel>
            <Dropdown selectedKey="Application Owner" options={fieldOptions} />
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

          <div>
            <Label>Correct Information (if known)</Label>
            <div className="textarea-wrap">
              <TextField multiline rows={3} defaultValue="John Smith" />
              <span className="counter">10/1000</span>
            </div>
          </div>

          <div>
            <Label>Impact / Reason (Optional)</Label>
            <div className="textarea-wrap">
              <TextField
                multiline
                rows={3}
                defaultValue="This affects notifications and routing."
              />
              <span className="counter">36/1000</span>
            </div>
          </div>

          <div>
            <Label>Attachments (Optional)</Label>
            <div className="upload-box">
              <Icon iconName="Attach" />
              <div>
                <div className="upload-text">
                  Drag and drop files here or{" "}
                  <button type="button" className="upload-link">
                    Browse
                  </button>
                </div>
                <div className="upload-help">
                  Supported file types: .png, .jpg, .pdf, .docx (Max 10 MB)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-title">2. Contact Information</div>

        <div className="form-grid">
          <div>
            <Label>Your Name</Label>
            <TextField defaultValue="Swathi Madala" />
          </div>

          <div>
            <Label>Email</Label>
            <TextField defaultValue="swathi.madala@contoso.com" />
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