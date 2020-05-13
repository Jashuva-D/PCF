import * as React from 'react';
import * as ReactDoM from 'react-dom';
import {TextField} from 'office-ui-fabric-react/lib/TextField'

interface ITestTextField{
    text : string
}

export default class TestTextField extends React.Component<ITestTextField> {
    constructor(props : ITestTextField){
        super(props);
    }
    private onchangeText( event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | 
        undefined ) {
        alert(newValue);
    }
    public render() : JSX.Element {
        return (
            <div>
               <TextField label="Test Input" onChange={this.onchangeText} />
            </div>
        )
    }
}