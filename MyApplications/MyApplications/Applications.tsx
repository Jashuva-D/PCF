import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DetailsList, IColumn } from '@fluentui/react';
import { IInputs } from './generated/ManifestTypes';
import { getUserEmail } from './Helper';

interface MyApplicationsProps {
    context: ComponentFramework.Context<IInputs>
}
interface MyApplicationsState {
    records: any[],
    columns: IColumn[]
}

class Applications extends React.Component<MyApplicationsProps, MyApplicationsState> {
    constructor(props: MyApplicationsProps) {
        super(props);
        this.state = {
            records: [],
            columns: [
                { key: 'cr549_id', name: 'Application Name (Short)', fieldName: 'cr549_id', minWidth: 100, maxWidth: 200, isResizable: true },
                { key: 'createdon', name: 'Created On', fieldName: 'createdon', minWidth: 100, maxWidth: 200, isResizable: true }
            ]
        }
    }
    componentDidMount() {
        var obj = this;
        getUserEmail(this.props.context.webAPI, this.props.context.userSettings.userId).then((email) => {
            var fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">
                        <entity name="cr549_application">
                        <attribute name="cr549_applicationid"/>
                        <attribute name="cr549_id"/>
                        <attribute name="createdon"/>
                        <order attribute="cr549_id" descending="false"/>
                        <link-entity name="cr549_appuserrole" from="cr549_app" to="cr549_applicationid" link-type="inner" alias="ai">
                        <link-entity name="cr549_person" from="cr549_personid" to="cr549_person" link-type="inner" alias="aj">
                        <filter type="and">
                        <condition attribute="cr549_email_address" operator="eq" value="${email}"/>
                        </filter>
                        </link-entity>
                        </link-entity>
                        </entity>
                        </fetch>`;
            obj.props.context.webAPI.retrieveMultipleRecords("cr549_application", "?fetchXml=" + encodeURIComponent(fetchXml)).then((result) => {
                obj.setState({ records: result.entities });
            });
        });
    }

    render() {
        return <DetailsList
            items={this.state.records}
            columns={this.state.columns}
        />
    }
}

export default Applications;