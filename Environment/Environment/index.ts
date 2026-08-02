import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import ReactDOM from "react-dom/client";
import EnvironmentTile from "./EnvironmentTile";

export class Environment implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    
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
        var root = ReactDOM.createRoot(this._container);
        
        var type = context.parameters.type.raw || "default";
        var environmentName = context.parameters.environmentname.raw || "DEV Environment";
        var applicationName = context.parameters.applicationname.raw || "1115 PMDA";
        var color = context.parameters.color.raw || "#0D2499";
        var environment_dev_url = context.parameters.environment_dev_url.raw;
        var environment_uat_url = context.parameters.environment_uat_url.raw;
        var environment_prod_url = context.parameters.environment_prod_url.raw;
        var environment_url = context.parameters.environment_url.raw;

        root.render(React.createElement(EnvironmentTile, { type: type, environmentname: environmentName, applicationname: applicationName, color: color, environment_dev_url: environment_dev_url, environment_uat_url: environment_uat_url, environment_prod_url: environment_prod_url, environment_url: environment_url }));
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        
    }
}
