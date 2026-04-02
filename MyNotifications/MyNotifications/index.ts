import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { NotificationModel } from "./Models";

import NotificationList from "./NotificationList";

export class MyNotifications implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        const notifications = [
            {
                icontype: 100000000,
                title: "CRMDB going live on July 11 2025",
                body: `New CRMDB replacing the current AWS CAMP DB is now available. Please start using it aspa and reach out in slack channel if any issues.`,
                createdon: new Date(),
                priority: 200000000
            } as NotificationModel,
            {
                icontype: 100000002,
                title: "Communications Updates: Week of December 1, 2025",
                body: `This week, the Communications team is updating the Fireside Chat CCG Menu page in CCG and sending the Q4 Security Campaign via GovDelivery. Two Resource Mailbox items are complete: the Q4 Closing the Loop email and the 2026 Initiatives Fireside Chat article, which will appear in the January Pulse. In addition, the new CRM102 module is live at https://cbt.cloud.cms.gov/CRM102/.`,
                createdon: new Date(),
                priority: 200000002
            } as NotificationModel,
            {
                icontype: 100000003,
                title: "Announcing Availability of Claude 3.7 with Cross Region Inference comm to be sent by HCs",
                body: `By EOD Wednesday 4/2, HCs are being asked to send to a targeted audience the Claude 3.7 comm.`,
                createdon: new Date(),
                priority: 200000001
            } as NotificationModel,

            
        ] as NotificationModel[];

        var currentuserid = context.userSettings.userId;
        var notifications1 = context.webAPI.retrieveMultipleRecords("appnotification",`?$filter=_ownerid_value eq '${currentuserid}'`).then(function(resp){
            var recs = [];
            resp.entities.forEach(x => {
                recs.push({
                    icontype: x.icontype,
                    title: x.title,
                    body: x.body,
                    createdon: x.createdon,
                    priority: x.priority
                })
            })
        })

        var root = ReactDOM.createRoot(this._container);
        root.render(React.createElement(NotificationList, { notifications }));
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

    }
}
