import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { timingSafeEqual } from "crypto";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DisplayText from './src/testcomponents/DisplayText';
import DisplayList from './src/components/DisplayListWithReactTable';
import { IContact } from "./src/models/IContact";
import { initializeIcons } from '@uifabric/icons';
initializeIcons();

export class ReactTable implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	public _container : HTMLDivElement;
	constructor()
	{
	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = container;
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		var container = this._container;		
		ReactDOM.render(
			React.createElement(DisplayList,{
				context : context
			}),
			container
		)
	}

	public getOutputs(): IOutputs
	{
		return {};
	}

	public destroy(): void
	{
	}
}