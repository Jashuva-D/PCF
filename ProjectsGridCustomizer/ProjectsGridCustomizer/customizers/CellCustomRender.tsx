import { Label, Text, Stack, Toggle } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const CellCustomRender: CellRendererOverrides = {
	["Text"]: (props: CellRendererProps, col) => {
		// if (col.colDefs[col.columnIndex].name === "cr549_projectnameshort" && props.formattedValue != null && props.formattedValue != "") {
		// 	return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#f2f2f2", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		// }
        if(col.colDefs[col.columnIndex].name == "cr549_projectnumber" && props.formattedValue != null && props.formattedValue != "") {
            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#f2f2f2", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
        }
        else if(col.colDefs[col.columnIndex].name == "cr549_hostingprojectnumber" && props.formattedValue != null && props.formattedValue != "") {
            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#d8dcee", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
        }
	},
    ["Integer"]: (props: CellRendererProps, col) => {
        if(col.colDefs[col.columnIndex].name == "cr549_hostingprojectid" && props.formattedValue != null && props.formattedValue != "") {
            return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text style={{backgroundColor: "#E6C8DB", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
        }
    }
};

