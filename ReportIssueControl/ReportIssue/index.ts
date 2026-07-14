import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import  ReportIssueButton  from "./ReportIssue";
import { initializeIcons } from "@fluentui/react";

initializeIcons();

export class ReportIssue implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    
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
        var title = context.parameters.title && context.parameters.title.raw ? context.parameters.title.raw : "Title";
        var tabname = context.parameters.tab && context.parameters.tab.raw ? context.parameters.tab.raw : "";
        var section = context.parameters.section && context.parameters.section.raw ? context.parameters.section.raw : "";
        var appname = context.parameters.appname && context.parameters.appname.raw ? context.parameters.appname.raw : "";
        var root = ReactDOM.createRoot(this._container);
        root.render(React.createElement(ReportIssueButton, { context: context, headerName : title, appName: appname, tabName : tabname, sectionName: section }));
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
