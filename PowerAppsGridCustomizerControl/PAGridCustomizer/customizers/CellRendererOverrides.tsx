import { Label, Text, Stack } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const cellRendererOverrides: CellRendererOverrides = {
	["Text"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_cms_group") {
			return <Stack verticalAlign="center" horizontalAlign="start"><Text style={{backgroundColor: "#EEEAF4", padding: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
		else if(col.colDefs[col.columnIndex].name === "cr549_cms_office"){
			return <Stack verticalAlign="center" horizontalAlign="start"><Text style={{backgroundColor: "#E9EEF3", padding: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
	}
};
