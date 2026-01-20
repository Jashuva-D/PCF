import { Label, Text, Stack } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const cellRendererOverrides: CellRendererOverrides = {
	["Text"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_cms_group" && props.formattedValue != null && props.formattedValue != "") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%"}}><Text style={{backgroundColor: "#EEEAF4", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
		else if(col.colDefs[col.columnIndex].name === "cr549_cms_office" && props.formattedValue != null && props.formattedValue != "") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%"}}><Text style={{backgroundColor: "#E9EEF3", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
	}
};
