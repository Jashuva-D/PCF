import * as React from "react";
import {Stack, StackItem, Icon, initializeIcons, Label, Tooltip, TooltipHost} from "@fluentui/react";
import { IInputs, IOutputs } from "./generated/ManifestTypes";

interface TemplateDescriptionProps {
    context : ComponentFramework.Context<IInputs,IOutputs>
}
interface TemplateDescriptionState {
    description : string | null
}

class TemplateDescriptionComp extends React.Component<TemplateDescriptionProps,TemplateDescriptionState>{
    constructor(props: TemplateDescriptionProps){
        super(props);
        initializeIcons();
        this.state = {
            description : "<b>Bold Text</b>"
        }
    }
    componentDidMount(): void {
        var obj = this;
        var currentrecordid = (this.props.context as any).page.entityId;
        if(currentrecordid != undefined && currentrecordid != null){
            this.props.context.webAPI.retrieveRecord("email",currentrecordid).then(function(resp){
                debugger;
                if(resp["_templateid_value"] != null){
                    obj.props.context.webAPI.retrieveRecord("template",resp["_templateid_value"]).then(function(resp){
                        debugger;
                        obj.setState({
                            description : resp.description
                        })
                    })
                }
                
            },function(err){
                debugger;
            })
        }
        
    }
    Refresh(){
        var obj = this;
        var currentrecordid = (this.props.context as any).page.entityId;
        if(currentrecordid != undefined && currentrecordid != null){
            this.props.context.webAPI.retrieveRecord("email",currentrecordid).then(function(resp){
                debugger;
                if(resp["_templateid_value"] != null){
                    obj.props.context.webAPI.retrieveRecord("template",resp["_templateid_value"]).then(function(resp){
                        debugger;
                        obj.setState({
                            description : resp.description
                        })
                    })
                }
                
            },function(err){
                debugger;
            })
        }
    }
    render(): React.ReactNode {
        const description = this.state.description;
        return <Stack>
                <StackItem>
                    <Stack horizontal horizontalAlign="space-between">
                        <StackItem style={{padding : 20}}>
                            <Label>Template Description</Label>
                        </StackItem>
                        <StackItem style={{padding : 20}}>
                            <TooltipHost content={"Refresh"}><Icon iconName={"refresh"} onClick={this.Refresh.bind(this)}></Icon></TooltipHost>
                        </StackItem>
                    </Stack>
                </StackItem>
                <StackItem style={{paddingBottom: 10}}>
                    <span dangerouslySetInnerHTML={{__html : description!}} />
                </StackItem>
            </Stack>;
    }
}

export default TemplateDescriptionComp;