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
import { TabOptions } from "./data";

interface ReportIssueProps {
  appname?: string;
  recordid?: string;
}

interface ReportIssueState {
    useremail: string | null;
    selectedTab: string;
    selectedSection: string;
    hostingcoordinator?: {
      name : string | null,
      email : string | null,
      recordid : string | null
    }
}


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
      useremail: "",
      selectedTab: TabOptions[0].key,
      selectedSection: TabOptions[0].sections[0].key,
    };
  }
  componentDidMount() {
    var obj = this;
    var userid = (parent as any).Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
    (parent as any).Xrm.WebApi.retrieveRecord("systemuser", userid, "?$select=fullname,internalemailaddress").then((user : any) => {
        obj.setState({ useremail: user.internalemailaddress });
      }
    ,function (error : any) {
        console.log(error.message);
    });

    (parent as any).Xrm.WebApi.retrieveRecord("cr549_application", this.props.recordid, "?$select=cr549_hostingcoordinator").then((app : any) => {
       alert(JSON.stringify(app));
       if(!app["_cr549_hostingcoordinator_value"]) return;
        (parent as any).Xrm.WebApi.retrieveRecord("cr549_person",app["_cr549_hostingcoordinator_value"],"?$select=cr549_name,cr549_email_address").then((coordinator : any) => {
          alert(JSON.stringify(coordinator));
          obj.setState({ hostingcoordinator: {
            name: coordinator.cr549_name,
            email: coordinator.cr549_email_address,
            recordid: coordinator.id
          } });
        },function (error : any) {
          alert(JSON.stringify(error));
          console.log(error.message);
        });
      },function (error : any) {
        alert(JSON.stringify(error));
        console.log(error.message);
    })
  }
  private onTabChanged = (_: any, option?: any) => {
    if (!option) return;

    this.setState({
      selectedTab: option.key,
      selectedSection: TabOptions.find(x => x.key === option.key)?.sections[0].key ?? ""
    });
  };

  private onSectionChanged = (_: any, option?: any) => {
    if (!option) return;

    this.setState({
      selectedSection: option.key
    });
  };

  render() {
    const { appname } = this.props;
    const userName = (parent as any)?.Xrm?.Utility?.getGlobalContext()?.userSettings?.userName ?? "";
    const userEmail = this.state.useremail;
    const selectedTab = TabOptions.find(x => x.key === this.state.selectedTab);
    const sectionOptions = selectedTab?.sections ?? [];

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
                options={TabOptions}
                selectedKey={this.state.selectedTab}
                onChange={this.onTabChanged}
            />
            </div>

            <div>
              <RequiredLabel>Section with Issue</RequiredLabel>
              <Dropdown
                options={sectionOptions}
                selectedKey={this.state.selectedSection}
                onChange={this.onSectionChanged}
            />
            </div>

            <div className="full-width">
              <RequiredLabel>Issue Description</RequiredLabel>

              <div className="textarea-wrap">
                <TextField
                  multiline
                  rows={6}
                  defaultValue=""
                  placeholder="Please provide a detailed description of the issue."
                />
              </div>
            </div>
          </div>

          <div className="contact-title">2. Assign To</div>
          <div className="form-grid">
            <div>
              <Label>Hosting Coordinator</Label>
              <TextField value={this.state.hostingcoordinator?.name ?? ""} />
            </div>
            <div>
              <Label>Email</Label>
              <TextField value={this.state.hostingcoordinator?.email ?? ""} />
            </div>
            <div>
              <Label>Delegate To</Label>
              <TextField />
            </div>
          </div>

          <div className="contact-title">3. Reported By</div>
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