import { Label, Text } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const cellRendererOverrides: CellRendererOverrides = {
	["Text"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_id") {
			return <div style={{backgroundColor: "red", width: "100%", height: "100%"}}><Text style={{backgroundColor:"red", color:"white"}}>{props.formattedValue}</Text></div>;
		}
		else if(col.colDefs[col.columnIndex].name === "cr549_cms_office"){
			return <div style={{ backgroundColor: "blue", width: "100%", height: "100%"}}><Text style={{ backgroundColor: "blue", color: "white" }}>{props.formattedValue}</Text></div>;
		}
	}
};
