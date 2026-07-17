import React, { Component } from "react";
import { DefaultButton, Dropdown, Icon, Label,IconButton, PrimaryButton, TextField, initializeIcons, DetailsList, IColumn, Text, Stack, StackItem, SelectionMode, TooltipHost} from "@fluentui/react";
import "./index.css";
import { TabOptions, DataField } from "./data";
import Lookup from "./Lookup";
import { FlagIcon } from "./icons";

interface ReportIssueProps {
  appname?: string;
  recordid?: string;
  tabname?: string;
  sectionname?: string;
}

interface ReportIssueState {
    issueTitle: string;
    issueDescription: string;
    useremail: string | null;
    selectedTab: string;
    selectedSection: string;
    selectedField: string;
    applicationdata?: any;
    hostingcoordinator?: {
      name : string | null,
      email : string | null,
      recordid : string | null
    }
    delegateuser? : {
      name : string | null,
      email : string | null,
      recordid : string | null
    }
    datafields : DataField[];
    datacolumns : IColumn[];
    currentrecord: DataField | null;
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

    var tab = TabOptions.find(x => x.key === this.props.tabname);
    var section = tab?.sections.find(x => x.key === this.props.sectionname);

    var currentrecord = { newrecord: true, tabname: tab?.text ?? "", sectionname: section?.text ?? "", fieldname: section?.fields?.[0]?.text ?? "", currentvalue: "", newvalue: "", fieldlabel: section?.fields?.[0]?.text ?? "" }
    
    this.state = {
      issueTitle: "",
      issueDescription: "",
      useremail: "",
      selectedTab: tab?.key ?? "",
      selectedSection: section?.key ?? "",
      selectedField: section?.fields?.[0]?.key ?? "",
      currentrecord: currentrecord,
      datafields: [currentrecord],
      datacolumns: [
        {
          key: "fieldname",
          name: "Field Name",
          fieldName: "FieldName",
          minWidth: 220,
          onRender: (item: any) => {
            if(item.newrecord){
              return (
                <Dropdown 
                  options = {TabOptions.find(x => x.key === this.state.selectedTab)?.sections.find(x => x.key === this.state.selectedSection)?.fields?.map(f => ({ key: f.key, text: f.text, multiline: f.multiline })) ?? []}
                  selectedKey={this.state.currentrecord?.fieldname}
                  onChange={(evt, option) => {
                    if(!option) return;
                    var currentrecord = { ...this.state.currentrecord!, fieldname: option.key ?? "", multiline: (option as any).multiline } as DataField;
                    if(this.state.applicationdata && (Object.keys(this.state.applicationdata).filter(x => x == currentrecord.fieldname) || Object.keys(this.state.applicationdata).filter(x => x == `_${currentrecord.fieldname}_value`))
                    ){
                      if(Object.keys(this.state.applicationdata).filter(x => x == `${currentrecord.fieldname}@OData.Community.Display.V1.FormattedValue`)){
                        currentrecord.currentvalue = this.state.applicationdata[`${currentrecord.fieldname}@OData.Community.Display.V1.FormattedValue`];
                      }
                      else if(Object.keys(this.state.applicationdata).filter(x => x == `_${currentrecord.fieldname}_value@OData.Community.Display.V1.FormattedValue`)){
                        currentrecord.currentvalue = this.state.applicationdata[`_${currentrecord.fieldname}_value@OData.Community.Display.V1.FormattedValue`];
                      }
                      else if(Object.keys(this.state.applicationdata).filter(x => x == currentrecord.fieldname)){
                        currentrecord.currentvalue = this.state.applicationdata[currentrecord.fieldname] ?? "";
                      }
                    }
                    this.setState({currentrecord: currentrecord})
                  }}
                />
              );
            }
            else {
              return (<Text>{item.fieldlabel}</Text>)
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
              return <TextField multiline={this.state.currentrecord?.multiline} autoAdjustHeight rows={1} value = {this.state.currentrecord?.currentvalue} onChange={(evt,value) => {this.setState({currentrecord: {...this.state.currentrecord!, currentvalue: value ?? ""}})}}/>
            }
            else {
              return <TooltipHost content={item.currentvalue}><Text>{item.currentvalue}</Text></TooltipHost>
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
              return <TextField multiline={this.state.currentrecord?.multiline} autoAdjustHeight rows={1} value = {this.state.currentrecord?.newvalue} onChange={(evt,value) => {this.setState({currentrecord: {...this.state.currentrecord!, newvalue: value ?? ""}})}}/>
            }
            else {
              return <TooltipHost content={item.newvalue}> <Text>{item.newvalue}</Text> </TooltipHost>
            }
          }
        } as IColumn,
        {
          key: "actions",
          name: "Actions",
          fieldName: "Actions",
          minWidth: 50,
          onRender: (item: any) => {
            if (item.newrecord) {
              var enablesavebutton = this.state.currentrecord?.fieldname != null && this.state.currentrecord?.fieldname != "" && this.state.currentrecord?.currentvalue != null && this.state.currentrecord?.currentvalue != "" && this.state.currentrecord?.newvalue != null && this.state.currentrecord?.newvalue != "";
              return <Stack horizontal horizontalAlign="center">
                <IconButton
                  title="Save"
                  iconProps={{iconName: "save", styles:{ root: {fontSize: 24}}}}
                  onClick={() => {
                    var fieldlabel = section?.fields?.find(x => x.key == this.state.currentrecord?.fieldname)?.text;
                    var currentrecord = { ...this.state.currentrecord , newrecord: false, fieldlabel: fieldlabel} as DataField;
                    var datafields = [...this.state.datafields.filter(x => x.newrecord === false), currentrecord!];
                    this.setState({
                      datafields: datafields,
                      currentrecord: null
                    })
                  }}
                  style={{fontSize: 48, color: "#0D2499"}}
                  disabled = {!enablesavebutton}
                  //style={{ borderRadius: 6, backgroundColor: "#0D2499", color: "white" }}
                />
              </Stack>
            }
            else {
              return <Stack horizontal horizontalAlign="center">
                <IconButton
                  onClick={() => {
                    this.setState(prevState => ({
                      datafields: prevState.datafields.filter((_, i) => i !== prevState.datafields.indexOf(item))
                    }));
                  }}
                  title="Delete"
                  iconProps={{iconName: "delete", styles: { root: {fontSize: 18}}}}
                  style={{fontSize: 18, color: "#0D2499"}}
                  //style={{ borderRadius: 6, backgroundColor: "#0D2499", color: "white" }}
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

    (parent as any).Xrm.WebApi.retrieveRecord("cr549_application", this.props.recordid).then((app : any) => {
       if(!app["_cr549_hostingcoordinator_value"]) return;
        (parent as any).Xrm.WebApi.retrieveRecord("cr549_person",app["_cr549_hostingcoordinator_value"],"?$select=cr549_name,cr549_email_address").then((coordinator : any) => {
          obj.setState({ 
            applicationdata: app,
            hostingcoordinator: {
              name: coordinator.cr549_name,
              email: coordinator.cr549_email_address,
              recordid: coordinator.id
            } 
          });
        },function (error : any) {
          console.log(error.message);
        });
      },function (error : any) {
        console.log(error.message);
    })
  }
  // private onTabChanged = (_: any, option?: any) => {
  //   if (!option) return;

  //   const selectedTab = TabOptions.find(x => x.key === option.key);
  //   const firstSection = selectedTab?.sections[0];

  //   this.setState({
  //     selectedTab: option.key,
  //     selectedSection: firstSection?.key ?? "",
  //     selectedField: firstSection?.fields?.[0]?.key ?? ""
  //   });
  // };

  // private onSectionChanged = (_: any, option?: any) => {
  //   if (!option) return;

  //   const selectedTab = TabOptions.find(x => x.key === this.state.selectedTab);
  //   const selectedSection = selectedTab?.sections.find(x => x.key === option.key);

  //   this.setState({
  //     selectedSection: option.key,
  //     selectedField: selectedSection?.fields?.[0]?.key ?? ""
  //   });
  // };

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

    var tab = TabOptions.find(x => x.key == this.state.selectedTab);
    var section = tab?.sections.find(x => x.key == this.state.selectedSection);

    return (
      <div className="report-page">
        <div className="report-header">
          <div className="report-header-icon">
            <FlagIcon />
          </div>

          <div>
            <h1 className="report-title">
              Application: {appname}
            </h1>

            <div className="report-subtitle">
              Help us improve BaseCamp by reporting incorrect or outdated application information.
            </div>
          </div>
        </div>

        <div className="report-card">
          <div className="section-title">Issue Details</div>

          <div className="form-grid">
            <div>
              <RequiredLabel>Tab with Issue</RequiredLabel>
              <Dropdown
                options={TabOptions}
                selectedKey={this.state.selectedTab}
                disabled
            />
            </div>
            <div>
              <RequiredLabel>Section with Issue</RequiredLabel>
              <Dropdown
                options={sectionOptions}
                selectedKey={this.state.selectedSection}
                disabled
              />
            </div>
            <div className="full-width">
              <RequiredLabel>Issue Title</RequiredLabel>
              <div className="textarea-wrap">
                <TextField
                  defaultValue=""
                  placeholder="Please provide a brief title for the issue."
                  value={`${appname ?? ""} - ${tab?.text ?? ""} - ${section?.text ?? ""} - Data Discrepancy`}
                  disabled
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
          <div className="form-grid">
            <div>
              <Stack>
                <Stack horizontalAlign="space-between" horizontal>
                  <div className="contact-title">Data Fields</div>
                  <div style={{paddingTop: 12}}>
                    <PrimaryButton iconProps={{ iconName: "Add" }} text="Add New" onClick={() => {
                      if(this.state.datafields.filter(x => x.newrecord == true).length == 0){
                        const selectedTabData = TabOptions.find(x => x.key === this.state.selectedTab);
                        const selectedSectionData = selectedTabData?.sections.find(x => x.key === this.state.selectedSection);
                        const selectedFieldData = selectedSectionData?.fields?.find(x => x.key === this.state.selectedField);
                        var currentrecord = { newrecord: true, tabname: selectedTabData?.text ?? "", sectionname: selectedSectionData?.text ?? "", fieldname: selectedFieldData?.text ?? "", currentvalue: "", newvalue: "", fieldlabel: selectedFieldData?.text ?? "" }
                        this.setState({
                          datafields: [...this.state.datafields, currentrecord],
                          currentrecord: currentrecord
                        });
                      }
                    }}
                    style={{ borderRadius: 6, backgroundColor: "#0D2499", color: "white" }}
                  />
                  </div>
                </Stack>
                <StackItem>
                    <DetailsList
                      className="appuserroles"
                      items={[...this.state.datafields]}
                      columns={[...this.state.datacolumns]}
                      selectionMode={SelectionMode.none} 
                      styles={{
                        contentWrapper: {
                          backgroundColor: "rgb(243,243, 243)",
                        },
                      }}
                    />
                </StackItem>
              </Stack>
            </div>
          </div>
          <div className="contact-title">Assign To</div>
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
              <TooltipHost content={"Select a delegate if the Hosting Coordinator is unavailable."}><Label>Delegate To</Label></TooltipHost>
              <Lookup 
                  entityType="cr549_person" 
                  allowMultiSelect={false} 
                  onRecordSelect={(items) => {
                  if(items.length > 0){
                    this.setState({
                      delegateuser: {  
                          name: items[0].text ?? "", email: items[0].thirdText ?? "", recordid: items[0].id ?? ""
                      }
                    })
                  }
               }}/>
            </div>
            <div>
              <Label>Delegate To Email</Label>
              <TextField disabled value={this.state.delegateuser?.email ?? ""} />
            </div>
          </div>

          <div className="contact-title">Reported By</div>
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
            style={{borderRadius: 6}}
            onClick={() => window.close()}
          />
          <PrimaryButton
            text="Submit Issue"
            iconProps={{ iconName: "Send" }}
            className="submit-button"
            style={{ borderRadius: 6, backgroundColor: this.state.datafields.filter(x => x.newrecord == false).length != 0 ? "#0D2499" : "#F2F2F2" , color: this.state.datafields.filter(x => x.newrecord == false).length != 0 ? "white" : "#5A5A5A" }}
            onClick={this.OnSubmitIssue.bind(this)}
            disabled = {this.state.datafields.filter(x => x.newrecord == false).length == 0}
          />
        </div>
      </div>
    );
  }
}