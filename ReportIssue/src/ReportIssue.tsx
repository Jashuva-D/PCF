import React, { Component } from "react";
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

interface ReportIssueProps {
  appname?: string;
  recordid?: string;
}

interface ReportIssueState {
    useremail: string | null;
}

const issueCategoryOptions = [
  { key: "1", text: "General" },
  { key: "2", text: "Accounts" },
  { key: "3", text: "Assigned People" },
  { key: "4", text: "Application Notes" },
  { key: "5", text: "Component Notes" },
  { key: "6", text: "Inquiry Notes" },
  { key: "7", text: "Application URLs" },
  { key: "8", text: "JIRA Tickets" },
  { key: "9", text: "Emails" },
  { key: "10", text: "Documents" },
  { key: "11", text: "Other or N/A" },
];

const fieldOptions = [
  { key: "1", text: "Details" },
  { key: "2", text: "Hosting Details" },
  { key: "3", text: "Business & System Owners" },
  { key: "4", text: "Funding" },
  { key: "5", text: "FISMA" },
  { key: "6", text: "Dates" },
  { key: "7", text: "Communication" },
  { key: "8", text: "Market Place" },
  { key: "9", text: "Accounts" },
  { key: "10", text: "Other or N/A" },
];

class RequiredLabel extends Component<{ children: React.ReactNode }> {
  render() {
    return (
      <Label>
        {this.props.children}
        <span className="required">*</span>
      </Label>
    );
  }
}

export default class ReportIssue extends Component<ReportIssueProps, ReportIssueState> {
  constructor(props: ReportIssueProps) {
    super(props);
    initializeIcons();
    this.state = {
      useremail: ""
    };
  }
  componentDidMount() {
    var userid = (parent as any).Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
    (parent as any).Xrm.WebApi.retrieveRecord("systemuser", userid, "?$select=fullname,internalemailaddress").then((user : any) => {
        this.setState({ useremail: user.internalemailaddress });
      }
    ,function (error : any) {
        alert("error: " + JSON.stringify(error));
        console.log(error.message);
    })
  }

  render() {
    const { appname } = this.props;
    const userName = (parent as any)?.Xrm?.Utility?.getGlobalContext()?.userSettings?.userName ?? "";
    const userEmail = this.state.useremail;

    return (
      <div className="report-page">
        <div className="report-header">
          <div className="report-header-icon">
            <Icon iconName="Flag" />
          </div>

          <div>
            <h1 className="report-title">
              Report an Issue with {appname}
            </h1>

            <div className="report-subtitle">
              Help us keep data accurate and reliable. Report incorrect or
              outdated information on this record.
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="section-title">1. Issue Details</div>

          <div className="form-grid">
            <div>
              <RequiredLabel>Tab with Issue</RequiredLabel>
              <Dropdown
                selectedKey="1"
                options={issueCategoryOptions}
              />
            </div>

            <div>
              <RequiredLabel>Section with Issue</RequiredLabel>
              <Dropdown
                selectedKey="1"
                options={fieldOptions}
              />
            </div>

            <div className="full-width">
              <RequiredLabel>Issue Description</RequiredLabel>

              <div className="textarea-wrap">
                <TextField
                  multiline
                  rows={3}
                  defaultValue=""
                  placeholder="Please provide a detailed description of the issue."
                />

                <span className="counter">85/2000</span>
              </div>
            </div>
          </div>

          <div className="contact-title">2. Contact Information</div>
          <div className="form-grid">
            <div>
              <Label>Your Name</Label>
              <TextField value={userName} />
            </div>

            <div>
              <Label>Email</Label>
              <TextField value={userEmail ?? ""} />
            </div>
          </div>
        </div>

        <div className="report-footer">
          <DefaultButton
            text="Cancel"
            className="cancel-button"
          />

          <PrimaryButton
            text="Submit Issue"
            iconProps={{ iconName: "Send" }}
            className="submit-button"
          />
        </div>
      </div>
    );
  }
}