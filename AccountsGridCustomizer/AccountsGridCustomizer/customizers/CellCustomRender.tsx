import { Label, Text, Stack, Toggle } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const CellCustomRender: CellRendererOverrides = {
	["Text"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_acct_name" && props.formattedValue != null && props.formattedValue != "") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
		else if(col.colDefs[col.columnIndex].name === "cr549_cms_office" && props.formattedValue != null && props.formattedValue != "") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#E6C8DB", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
        else if(col.colDefs[col.columnIndex].name.endsWith("cr549_projectnumber") && props.formattedValue != null && props.formattedValue != "") {
            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
        }//ad_depthtest2
        // else if(col.colDefs[col.columnIndex].name.endsWith("cr549_projectnumber") && props.formattedValue != null && props.formattedValue != "") {
        //     return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
        // }
	},
    ["TwoOptions"]: (props: CellRendererProps, col) => {
        if (col.colDefs[col.columnIndex].name === "cr549_marketplace") {
            return <Stack verticalAlign="center" horizontalAlign="center" style={{height: "100%", paddingLeft: "8px"}}><Text style={{color: props.value == 1 ? "#12890E" : "#E31C3D"}}>{props.value == 1 ? "Yes" : "No"}</Text></Stack>
        }
    }
};

