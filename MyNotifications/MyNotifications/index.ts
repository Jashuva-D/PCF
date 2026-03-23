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
                title: "Lorem ipsum dolor sit amet consectetur adipiscing",
                body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
                createdon: new Date(),
                priority: 200000000
            } as NotificationModel,

            {
                icontype: 100000003,
                title: "Ut enim ad minim veniam quis nostrud exercitation",
                body: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
                createdon: new Date(),
                priority: 200000001
            } as NotificationModel,

            {
                icontype: 100000002,
                title: "Sed ut perspiciatis unde omnis iste natus error",
                body: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                createdon: new Date(),
                priority: 200000002
            } as NotificationModel,

            {
                icontype: 100000001,
                title: "Nemo enim ipsam voluptatem quia voluptas sit",
                body: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.Sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
                createdon: new Date(),
                priority: 200000000
            } as NotificationModel
        ] as NotificationModel[];

        var root = ReactDOM.createRoot(this._container);
        root.render(React.createElement(NotificationList, { notifications }));
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {

    }
}
