import { IInputs, IOutputs } from "./generated/ManifestTypes";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
type DataSet = ComponentFramework.PropertyTypes.DataSet;
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import  NotificationList  from "./NotificationList";

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
            { type: "Info", message: "This is an info message", user: "Anuradha", time: "24 Nov 2018 at 9:30 AM", color: "green" },
            { type: "Warning", message: "This is a warning message", user: "Anuradha", time: "24 Nov 2018 at 9:30 AM", color: "orange" },
            { type: "Error", message: "This is an error message", user: "Anuradha", time: "24 Nov 2018 at 9:30 AM", color: "purple" },
            { type: "Info", message: "This is another info message", user: "Anuradha", time: "24 Nov 2018 at 9:30 AM", color: "blue" }
        ];

        var root = ReactDOM.createRoot(this._container);
        root.render(React.createElement(NotificationList, { notifications }));
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

    }
}
