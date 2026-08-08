import * as React from "react";
import ReportIssue from "./ReportIssue";
import DiscrepanciesList from "./DiscrepanciesList";
import {
    DefaultButton,
    PrimaryButton,
    Stack
} from "@fluentui/react";

interface DataDiscrepnaciesProps {
    appname?: string | null;
    recordid?: string | null;
    tabname?: string | null;
    sectionname?: string | null;
    appuserroleid?: string | null;
}

interface DataDiscrepanciesState {
    openreportissue: boolean;
    displaylist: boolean;
}

class DataDescripancies extends React.Component<DataDiscrepnaciesProps, DataDiscrepanciesState> {

    constructor(props: DataDiscrepnaciesProps) {
        super(props);
        this.state = {
            openreportissue: false,
            displaylist: true
        };
    }

    render(): React.ReactNode {
        return (
            <Stack styles={{ root: { minHeight: "100vh", display: "flex",   flexDirection: "column" }}}>
                <PrimaryButton
                    text="Add New"
                    iconProps={{ iconName: "add" }}
                    className="submit-button"
                    style={{
                        borderRadius: 6,
                        backgroundColor: this.state.openreportissue
                            ? "#F2F2F2"
                            : "#0D2499",
                        color: this.state.openreportissue
                            ? "#5A5A5A"
                            : "white"
                    }}
                    disabled={this.state.openreportissue}
                    onClick={() => {
                        this.setState({
                            openreportissue: true,
                            displaylist: false
                        });
                    }}
                />

                {this.state.displaylist && (
                    <DiscrepanciesList />
                )}

                {this.state.openreportissue && (
                    <ReportIssue
                        appname={this.props.appname ?? ""}
                        recordid={this.props.recordid ?? ""}
                        tabname={this.props.tabname ?? ""}
                        sectionname={this.props.sectionname ?? ""}
                        appuserroleid={this.props.appuserroleid ?? ""}
                        onClose={() => {
                            this.setState({
                                openreportissue: false,
                                displaylist: true
                            });
                        }}
                    />
                )}

                <Stack
                    horizontal
                    horizontalAlign="end"
                    styles={{
                        root: {
                            marginTop: "auto",
                            paddingTop: 10
                        }
                    }}
                >
                    <DefaultButton
                        text="Close"
                        style={{
                            borderRadius: 6,
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                        onClick={() => {
                            window.close();
                        }}
                    />
                </Stack>

            </Stack>
        );
    }
}

export default DataDescripancies;