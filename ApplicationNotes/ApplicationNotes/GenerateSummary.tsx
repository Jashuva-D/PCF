import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import { Stack, StackItem, TextField, PrimaryButton, ProgressIndicator, Label } from "@fluentui/react";

interface GenerateSummaryProps {
    context: ComponentFramework.Context<IInputs>;
    closeCallback: () => void;
}
interface GenerateSummaryState {
    summary: string;
    displaySummary?: boolean;
    generating?: boolean;
}

class GenerateSummary extends React.Component<GenerateSummaryProps, GenerateSummaryState> {
    constructor(props: GenerateSummaryProps) {
        super(props);
        this.state = {
            summary: "",
            displaySummary: false,
            generating: false
        };
    }
    componentDidMount() {
        var obj = this;
        var currentrecordid = (this.props.context as any).page.entityId;
        this.setState({ generating: true });

        var request = {
            entity: { entityType: "camp_application", id: currentrecordid }, // entity

            getMetadata: function () {
                return {
                    boundParameter: "entity",
                    parameterTypes: {
                        entity: { typeName: "mscrm.camp_application", structuralProperty: 5 }
                    },
                    operationType: 0, operationName: "camp_GenerateAppNotesSummary"
                };
            }
        };

        (obj.props.context.webAPI as any).execute(request).then(
            function success(response: any) {
                if (response.ok) { return response.json(); }
            }
        ).then(function (responseBody: any) {
            var result = responseBody;
            console.log(result);
            var summary = result["summary"] as string;
            obj.setState({displaySummary: true, summary: summary, generating: false });
        }).catch(function (error: any) {
            console.log(error.message);
            obj.setState({ generating: false });
            obj.props.context.navigation.openAlertDialog({ text: "Error generating summary: " + error?.message });
        });
    }

    render(): React.ReactNode {
        return <Stack tokens={{ childrenGap: 10 }}>
            {this.state.generating && <StackItem>
                <ProgressIndicator styles={{ root: { textAlign: "center", color: "#0078D4"} }} label={<Label style={{color : "#0078D4", alignItems: "center"}}>Generating Summary</Label>}  />
            </StackItem>}
            {this.state.displaySummary && <>
                <StackItem>
                    <TextField
                        placeholder="Summary..."
                        styles={{
                            root: { width: "100%", padding: 10 },
                            fieldGroup: { background: "transparent", borderRadius: 6, border: "1px solid #d1d1d1" },
                            field: { borderRadius: 6 },
                        }}
                        multiline autoAdjustHeight
                        value={this.state.summary}
                    />
                </StackItem>
                <StackItem align="end">
                    <PrimaryButton text="Close" style={{ borderRadius: 6 }} onClick={() => { this.setState({ displaySummary: false, summary: "" }); this.props.closeCallback();}}></PrimaryButton>
                </StackItem>
            </>}
        </Stack>
    } 
}

export default GenerateSummary;