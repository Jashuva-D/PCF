import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Notes from "./Notes";

export class ApplicationNotes implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement
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
        var root = ReactDOM.createRoot(this._container);
        root.render(React.createElement(Notes, { context: context }));
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
