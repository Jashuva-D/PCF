import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import DataSetInterfaces = ComponentFramework.PropertyHelper.DataSetApi;
import Notes from "./Notes";
type DataSet = ComponentFramework.PropertyTypes.DataSet;

export class ComponentNotes implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement
    constructor() {
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
        var root = ReactDOM.createRoot(this._container);
        var parententity = context.parameters.parententity.raw ?? undefined;
        
        root.render(React.createElement(Notes, { context: context, parententity: parententity }));
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
