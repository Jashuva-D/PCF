import React, { Component } from "react";
import { DefaultButton, Dropdown, Icon, Label, PrimaryButton, TextField, initializeIcons, DetailsList, IColumn, Text, Stack, StackItem, SelectionMode} from "@fluentui/react";
import "./index.css";
import { TabOptions, DataField } from "./data";

interface ReportIssueProps {
  appname?: string;
  recordid?: string;
}

interface ReportIssueState {
    issueTitle: string;
    issueDescription: string;
    useremail: string | null;
    selectedTab: string;
    selectedSection: string;
    selectedField: string;
    hostingcoordinator?: {
      name : string | null,
      email : string | null,
      recordid : string | null
    }
    datafields : DataField[];
    datacolumns : IColumn[];
    currentrecord: DataField;
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
    const firstTab = TabOptions[0];
    const firstSection = firstTab.sections[0];

    this.state = {
      issueTitle: "",
      issueDescription: "",
      useremail: "",
      selectedTab: firstTab.key,
      selectedSection: firstSection.key,
      selectedField: firstSection.fields?.[0]?.key ?? "",
      currentrecord: { newrecord: true, tabname: firstTab.text, sectionname: firstSection.text, fieldname: firstSection.fields?.[0]?.text ?? "", currentvalue: "", newvalue: "" },
      datafields: [this.state.currentrecord],
      datacolumns: [
        {
          key: "fieldname",
          name: "Field Name",
          fieldName: "FieldName",
          minWidth: 170,
          onRender: (item: any) => {
            if(item.newrecord){
              return (
                <Dropdown 
                  options = {TabOptions.find(x => x.key === this.state.selectedTab)?.sections.find(x => x.key === this.state.selectedSection)?.fields?.map(f => ({ key: f.key, text: f.text })) ?? []}
                  selectedKey={item.fieldname}
                />
              );
            }
            else {
              return (<Text>{item.fieldname}</Text>)
            }
            
          }
        } as IColumn,
        {
          key: "currentvalue",
          name: "Current Value",
          fieldName: "CurrentValue",
          minWidth: 170,
          onRender: (item: any) => {
            if(item.newrecord){
              return <TextField />
            }
            else {
              return <Text>{item.currentvalue}</Text>
            }
          }
        } as IColumn,
        {
          key: "newvalue",
          name: "New Value",
          fieldName: "NewValue",
          minWidth: 170,
          onRender: (item: any) => {
            if(item.newrecord){
              return <TextField />
            }
            else {
              return <Text>{item.newvalue}</Text>
            }
          }
        } as IColumn,
        {
          key: "actions",
          name: "Actions",
          fieldName: "Actions",
          minWidth: 100,
          onRender: (item: any) => {
            if (item.newrecord) {
              return <Stack horizontal>
                <PrimaryButton
                  text="Save"
                  onClick={() => {
                    var currentrecord = { ...this.state.currentrecord , newrecord: false};
                    var datafields = [...this.state.datafields.filter(x => x.newrecord === false), currentrecord];
                    this.setState({
                      datafields: datafields,
                      currentrecord: { newrecord: true, tabname: this.state.selectedTab, sectionname: this.state.selectedSection, fieldname: this.state.selectedField, currentvalue: "", newvalue: "" }
                    })
                  }}
                  style={{ borderRadius: 6, backgroundColor: "#0D2499", color: "white" }}
                />
              </Stack>
            }
            else {
              return <Stack horizontal>
                <PrimaryButton
                  onClick={() => {
                    this.setState(prevState => ({
                      datafields: prevState.datafields.filter((_, i) => i !== prevState.datafields.indexOf(item))
                    }));
                  }}
                  text="Delete"
                  style={{ borderRadius: 6, backgroundColor: "#0D2499", color: "white" }}
                />
              </Stack>
            }
          }
        }
      ]
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

    (parent as any).Xrm.WebApi.retrieveRecord("cr549_application", this.props.recordid, "?$select=_cr549_hostingcoordinator_value").then((app : any) => {
       if(!app["_cr549_hostingcoordinator_value"]) return;
        (parent as any).Xrm.WebApi.retrieveRecord("cr549_person",app["_cr549_hostingcoordinator_value"],"?$select=cr549_name,cr549_email_address").then((coordinator : any) => {
          obj.setState({ hostingcoordinator: {
            name: coordinator.cr549_name,
            email: coordinator.cr549_email_address,
            recordid: coordinator.id
          } });
        },function (error : any) {
          console.log(error.message);
        });
      },function (error : any) {
        console.log(error.message);
    })
  }
  private onTabChanged = (_: any, option?: any) => {
    if (!option) return;

    const selectedTab = TabOptions.find(x => x.key === option.key);
    const firstSection = selectedTab?.sections[0];

    this.setState({
      selectedTab: option.key,
      selectedSection: firstSection?.key ?? "",
      selectedField: firstSection?.fields?.[0]?.key ?? ""
    });
  };

  private onSectionChanged = (_: any, option?: any) => {
    if (!option) return;

    const selectedTab = TabOptions.find(x => x.key === this.state.selectedTab);
    const selectedSection = selectedTab?.sections.find(x => x.key === option.key);

    this.setState({
      selectedSection: option.key,
      selectedField: selectedSection?.fields?.[0]?.key ?? ""
    });
  };

  private onFieldChanged = (_: any, option?: any) => {
    if (!option) return;

    this.setState({
      selectedField: option.key
    });
  };

  OnSubmitIssue() {
    var obj = this;

    const selectedTabData = TabOptions.find(x => x.key === this.state.selectedTab);
    const selectedSectionData = selectedTabData?.sections.find(x => x.key === this.state.selectedSection);
    const selectedFieldData = selectedSectionData?.fields?.find(x => x.key === this.state.selectedField);

    var request = {
      Application: obj.props.appname ?? "", 
      TabName: selectedTabData?.text ?? "", 
      SectionName: selectedSectionData?.text ?? "",
      FieldName: selectedFieldData?.text ?? "",
      Description: this.state.issueDescription ?? "",
      FromEmailAddress: this.state.useremail ?? "",
      FromUserId: (parent as any).Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, ""),

      getMetadata: function () {
        return {
          boundParameter: null,
          parameterTypes: {
            Application: { typeName: "Edm.String", structuralProperty: 1 },
            TabName: { typeName: "Edm.String", structuralProperty: 1 },
            SectionName: { typeName: "Edm.String", structuralProperty: 1 },
            FieldName: { typeName: "Edm.String", structuralProperty: 1 },
            Description: { typeName: "Edm.String", structuralProperty: 1 },
            FromEmailAddress: { typeName: "Edm.String", structuralProperty: 1 },
            FromUserId: { typeName: "Edm.String", structuralProperty: 1 }
          },
          operationType: 0, operationName: "crm2_ReportIssueCreateIssue"
        };
      }
    };

    (parent as any).Xrm.WebApi.execute(request).then(
      function success(response: any) {
        if (response.ok) { 
          console.log("Success"); 
          window.close();
        }
      }
    ).catch(function (error: any) {
      console.log(error.message);
    });
  }

  render() {
    const { appname } = this.props;
    const userName = (parent as any)?.Xrm?.Utility?.getGlobalContext()?.userSettings?.userName ?? "";
    const userEmail = this.state.useremail;
    const selectedTab = TabOptions.find(x => x.key === this.state.selectedTab);
    const sectionOptions = selectedTab?.sections ?? [];
    const selectedSectionData = sectionOptions.find(x => x.key === this.state.selectedSection);
    const fieldOptions = selectedSectionData?.fields ?? [];

    return (
      <div className="report-page">
        <div className="report-header">
          <div className="report-header-icon">
            <Icon iconName="Flag" />
          </div>

          <div>
            <h1 className="report-title">
              Report an Issue for {appname}
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
              <RequiredLabel>Application</RequiredLabel>
              <TextField value={appname} disabled/>
            </div>
            <div>
              <RequiredLabel>Priority</RequiredLabel>
              <Dropdown
                options={[
                  { key: "high", text: "High" },
                  { key: "medium", text: "Medium" },
                  { key: "low", text: "Low" },
                ]}
                selectedKey={this.state.selectedTab}
                onChange={this.onTabChanged}
              />
            </div>
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
              <RequiredLabel>Issue Title</RequiredLabel>
              <div className="textarea-wrap">
                <TextField
                  defaultValue=""
                  placeholder="Please provide a brief title for the issue."
                  value={this.state.issueTitle}
                  onChange={(e, value) => this.setState({ issueTitle: value ?? "" })}
                />
              </div>
            </div>
            <div className="full-width">
              <RequiredLabel>Issue Description</RequiredLabel>
              <div className="textarea-wrap">
                <TextField
                  multiline
                  rows={6}
                  defaultValue=""
                  placeholder="Please provide a detailed description of the issue."
                  value={this.state.issueDescription}
                  onChange={(e, value) => this.setState({ issueDescription: value ?? "" })}
                />
              </div>
            </div>
          </div>
          <div className="section-title">2. Data Fields</div>
          <div className="form-grid">
            <div>
              <Stack>
                <Stack horizontalAlign="end">
                  <PrimaryButton iconProps={{ iconName: "Add" }} text="Add New" onClick={() => {
                      const selectedTabData = TabOptions.find(x => x.key === this.state.selectedTab);
                      const selectedSectionData = selectedTabData?.sections.find(x => x.key === this.state.selectedSection);
                      const selectedFieldData = selectedSectionData?.fields?.find(x => x.key === this.state.selectedField);
                      this.setState(prevState => ({
                        datafields: [...prevState.datafields, { newrecord: true, tabname: selectedTabData?.text ?? "", sectionname: selectedSectionData?.text ?? "", fieldname: selectedFieldData?.text ?? "", currentvalue: "", newvalue: "" }]
                      }));
                    }}
                    style={{ borderRadius: 6, backgroundColor: "#0D2499", color: "white" }}
                  />
                </Stack>
                <StackItem>
                    <DetailsList
                      className="appuserroles"
                      items={this.state.datafields}
                      columns={this.state.datacolumns}
                      selectionMode={SelectionMode.none} // Disable selection
                    />
                </StackItem>
              </Stack>
            </div>
          </div>
          <div className="contact-title">3. Assign To</div>
          <div className="form-grid">
            <div>
              <Label>Hosting Coordinator</Label>
              <TextField value={this.state.hostingcoordinator?.name ?? ""} disabled/>
            </div>
            <div>
              <Label>Email</Label>
              <TextField value={this.state.hostingcoordinator?.email ?? ""} disabled/>
            </div>
            <div>
              <Label>Delegate To</Label>
              <TextField />
            </div>
            <div>
              <Label>Delegate To Email</Label>
              <TextField />
            </div>
          </div>

          <div className="contact-title">4. Reported By</div>
          <div className="form-grid">
            <div>
              <Label>Your Name</Label>
              <TextField value={userName} disabled/>
            </div>

            <div>
              <Label>Email</Label>
              <TextField value={userEmail ?? ""} disabled/>
            </div>
          </div>
        </div>

        <div className="report-footer">
          <DefaultButton
            text="Cancel"
            className="cancel-button"
            onClick={() => window.close()}
          />
          <PrimaryButton
            text="Submit Issue"
            iconProps={{ iconName: "Send" }}
            className="submit-button"
            onClick={this.OnSubmitIssue.bind(this)}
          />
        </div>
      </div>
    );
  }
}