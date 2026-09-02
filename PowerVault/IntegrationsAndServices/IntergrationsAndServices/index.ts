import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import OptionTiles from "./Tiles";


export class IntergrationsAndServices implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    
    _container: HTMLDivElement;
    _notifyOutputChanged: () => void;
    _selectedOptions: number[] = [];
    constructor() {
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        var root = ReactDOM.createRoot(this._container);
        root.render(React.createElement(OptionTiles, { context: context }));
    }

    public onChange(selected: number[]): void {
        this._selectedOptions = selected;
        this._notifyOutputChanged();
    }
    public getOutputs(): IOutputs {
        return {
            optionsproperty: this._selectedOptions
        };
    }

    public destroy(): void {
        
    }
}
