import * as React from "react";
import { DefaultButton, Dialog, Icon, PrimaryButton, Link, Stack, StackItem, Label, Text, TextField, Dropdown } from "@fluentui/react";   
import Lookup from "./Lookup";

interface SendForReviewProps {
    isOpen: boolean;
    iserror?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    title: string | null | undefined;
    subText: string | null | undefined;
    confirmbuttoncolor: string | null;
    subTextElement: React.ReactElement | null;
    takenotes?: boolean 
    noteslabel? : string
    colors?: {
        legend: string,
        background: string
    }
    onDismiss: () => void | undefined;
    onConfirm: (reviewwith: number, reviewer: any, notes: string) => void | undefined;
    onCancel: () => void | undefined;


}
interface SendForReviewState {
    notes: string,
    reviewwith: number
    person: {
        id: string,
        text: string | null,
        secondaryText: string | null | undefined
    } | null
}

class SendForReviewPopup extends React.Component<SendForReviewProps, SendForReviewState>{
    constructor(props: SendForReviewProps) {
        super(props);
        this.state = {
            notes: "",
            reviewwith: 0,
            person: null
        }
    }

    render() {
        return (
            <Dialog
                hidden={!this.props.isOpen}
                onDismiss={this.props.onDismiss}
                dialogContentProps={{
                    title: <Text style={{fontSize: 14, fontWeight: 600, color: this.props.colors?.legend }}>{this.props.title}</Text>,
                    subText: this.props.takenotes != true ? this.props.subText! : "",
                    styles: {
                        subText: { whiteSpace: "pre-line" }
                    },
                }}
                modalProps={{
                    isBlocking: true,
                    styles: { 
                        main: {maxWidth: 2000, minWidth: 2000 },
                    }
                }}
                minWidth={400}
            >
            <Stack style={{border: "1px solid", borderColor: this.props.colors?.legend,backgroundColor: this.props.colors?.background, borderRadius: 6, padding: 10 }}>
                <Stack horizontal tokens={{childrenGap: 10}} horizontalAlign="space-between" verticalAlign="space-between">
                    <Dropdown 
                        label="Review with   "
                        options={[
                            { key: 289940000, text: "Auditor"},
                            { key: 289940001, text: "HA"},
                            { key: 289940002, text: "FA"},
                            { key: 289940003, text: "BaseCamp"},
                            { key: 289940004, text: "Other"}
                        ]}
                        dropdownWidth={"auto"}
                        onChange={(event, value) => {
                            this.setState({ reviewwith: value?.key as number})
                        }}
                    />
                    <StackItem>
                        <Stack>
                            <Label>Reviewver</Label>
                            <Lookup 
                                entityType="cr549_person"
                                allowMultiSelect={false}
                                applystyles={true}
                                onRecordSelect={(items) => {
                                    if(items.length > 0){
                                        this.setState({ person : items[0]});
                                    }
                                    else {
                                        this.setState({person: null})
                                    }
                                }}
                            />
                        </Stack>
                    </StackItem>
                </Stack>
                {this.props.takenotes && <TextField multiline label={this.props.noteslabel ?? ""} style={{ borderRadius: 10}} styles={{root: {borderRadius: 10}}} placeholder="Enter Notes" onChange={ (evt, newvalue) => { this.setState({notes: newvalue ?? ""})} }></TextField>}
                <Stack horizontal tokens={{childrenGap: 10}} style={{marginTop: 20}}>
                    <PrimaryButton 
                        text={this.props.confirmButtonText || "OK"} 
                        onClick={() => this.props.onConfirm(this.state.reviewwith, this.state.person, this.state.notes)}
                        style={{ borderRadius: 6, backgroundColor: this.props.colors?.legend, borderColor: this.props.colors?.legend }} 
                    />
                    <DefaultButton 
                        text={this.props.cancelButtonText || "Cancel"} 
                        onClick={this.props.onCancel}
                        style={{ borderRadius: 6 }} 
                    />
                </Stack>
            </Stack>
            
            </Dialog>
        );      
    }
}
export default SendForReviewPopup;