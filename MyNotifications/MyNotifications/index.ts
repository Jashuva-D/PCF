import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import  NotificationList  from "./NotificationList";
import { NotificationType } from "./constants";
import { title } from "process";
import { Notification } from "./Models";

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
            { icontype: 100000000, title: "Info Message", body: "This is an info message", createdon: new Date(), priority: 200000000 } as Notification,
            { icontype: 100000003, title: "Warning Message", body: "This is a warning message", createdon: new Date(), priority: 200000001 } as Notification,
            { icontype: 100000002, title: "Error Message", body: "This is an error message", createdon: new Date(), priority: 200000002 } as Notification,
            { icontype: 100000000, title: "Another Info Message", body: "This is another info message", createdon: new Date(), priority: 200000000 } as Notification    
        ] as Notification[];

        var root = ReactDOM.createRoot(this._container);
        root.render(React.createElement(NotificationList, { notifications }));
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

    }
}
