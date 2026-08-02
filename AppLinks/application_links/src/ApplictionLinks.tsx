import * as React from 'react';
import { DetailsList, IColumn } from '@fluentui/react/lib/DetailsList';
import EnvironmentTile from './EnvironmentTile';

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
                    maxWidth: 200, 
                    isResizable: true,
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
            <div>Application Links</div>
            <DetailsList
                columns={this.state.columns}
                items={this.state.items}
                selectionMode={0}
            ></DetailsList>
        </>;
    }
}

export default ApplicationLinks;