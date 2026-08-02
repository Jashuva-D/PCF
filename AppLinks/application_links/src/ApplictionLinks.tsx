import * as React from 'react';
import { DetailsList, IColumn, Stack, Label, StackItem, TextField } from '@fluentui/react';
import EnvironmentTile from './EnvironmentTile';
import { ApplicationIcon, SearchIcon } from './Icons';

interface IApplicationLinksProps {
}
interface IApplicationLinksState {
    columns: IColumn[];
    items: any[];
}


class ApplicationLinks extends React.Component<IApplicationLinksProps, IApplicationLinksState> {
    constructor(props: IApplicationLinksProps) {
        super(props);
        this.state = {
            columns: [
                { 
                    key: 'appname', 
                    name: 'Application', 
                    fieldName: 'applicationname', 
                    minWidth: 200, 
                    maxWidth: 300,
                    isResizable: true,
                    onRenderHeader: () => (
                        <Label style={{ fontSize: 20, fontWeight: "bold", alignContent: "center", alignItems: "center" }}>Application</Label>
                    ),
                    onRender: (item: any) => (
                        <div style={{ padding: 10 }}>
                            <Stack horizontal horizontalAlign='start' verticalAlign="center" styles={{ root: { margin: 10 } }} tokens={{ childrenGap: 10 }}>
                                <ApplicationIcon size={24} color={item.color} />
                                <div style={{ fontSize: 16, fontWeight: "bold", alignContent: "start", alignItems: "start" }}>
                                    {item.applicationname}
                                </div>
                            </Stack>
                        </div>
                        
                    )
                },
                { 
                    key: 'dev_url', 
                    name: '', 
                    fieldName: 'environmentname', 
                    minWidth: 100, 
                    maxWidth: 200, 
                    isResizable: true,
                    onRender: (item: any) => (
                        <div style={{ padding: 10 }}>
                            <EnvironmentTile
                                environmentname="DEV"
                                applicationname={item.applicationname}
                                environment_url={item.environment_dev_url}
                                color={item.color}
                                bgcolor="#EEF2FF"
                            />
                        </div>
                        
                    )  
                },
                { 
                    key: 'uat_url', 
                    name: '', 
                    fieldName: 'environmentname', 
                    minWidth: 100, 
                    maxWidth: 200, 
                    isResizable: true,
                    onRender: (item: any) => (
                        <div style={{ padding: 10 }}>
                            <EnvironmentTile
                                environmentname="UAT"
                                applicationname={item.applicationname}
                                environment_url={item.environment_UAT_url}
                                color="#53389E"
                                bgcolor="#F2EEFB"
                            />
                        </div>
                    )  
                },
                { 
                    key: 'prod_url', 
                    name: '', 
                    fieldName: 'environmentname', 
                    minWidth: 100, 
                    maxWidth: 200, 
                    isResizable: false,
                    onRender: (item: any) => (
                        <div style={{ padding: 10 }}>
                            <EnvironmentTile
                                environmentname="PROD"
                                applicationname={item.applicationname}
                                environment_url={item.environment_prod_url}
                                color="#0E7433"
                                bgcolor="#EDF9F1"
                            />
                        </div>
                    )  
                },
                { 
                    key: 'dummy', 
                    name: '', 
                    fieldName: 'environmentname', 
                    minWidth: 100, 
                    maxWidth: 200, 
                    isResizable: false,
                }
            ],
            items: [{
                applicationname: 'BaseCamp',
                environment_dev_url: 'https://example.com/env1',
                environment_UAT_url: 'https://example.com/env2',
                environment_prod_url: 'https://example.com/env3',
                color: 'blue'
            },
            {
                applicationname: 'BaseCamp Go',
                environment_dev_url: 'https://example.com/env1',
                environment_UAT_url: 'https://example.com/env2',
                environment_prod_url: 'https://example.com/env3',
                color: 'blue'
            },
            {
                applicationname: 'Feedback Factory',
                environment_dev_url: 'https://example.com/env1',
                environment_UAT_url: 'https://example.com/env2',
                environment_prod_url: 'https://example.com/env3',
                color: 'blue'
            }

        ]
        };
    }
    componentDidMount() {

    }
    render() {
        return <>
            <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="space-between">
                <StackItem grow>
                    <TextField
                        style={{ borderRadius: "10" }}
                        //value={this.state.searchText || ""}
                        placeholder="Search Notes..."
                        onChange={(e, newValue) => {
                            if (newValue == null || newValue == "") {
                                //this.setState({searchText: "", filterApplied : false})
                            }
                            else {
                                //this.setState({ searchText: newValue || "" });
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                //this.onSearchClick.bind(this)();
                            }
                        }}
                        styles={{
                            fieldGroup: { background: "transparent", borderRadius: 6, border: "1px solid #d1d1d1", height: 36 },
                            field: { borderRadius: 6, height: 36, fontSize: 15, padding: 8 },
                            prefix: { background: "#0D2499", borderRadius: "6px 0 0 6px" },
                            suffix: { background: "transparent" },
                        }}
                        onRenderPrefix={() => (
                            <span style={{ borderRadius: 20 }}><SearchIcon size={24} color="white" /> </span>
                        )}

                    />
                </StackItem>
            </Stack>
            <DetailsList
                columns={this.state.columns}
                items={this.state.items}
                selectionMode={0}
            ></DetailsList>
        </>;
    }
}

export default ApplicationLinks;