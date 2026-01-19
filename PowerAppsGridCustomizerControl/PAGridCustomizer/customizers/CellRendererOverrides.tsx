import { Label, Text } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const cellRendererOverrides: CellRendererOverrides = {
	["Text"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_id") {
			return <Text style={{backgroundColor:"red", color:"white"}}>{props.formattedValue}</Text>
		}
		else if(col.colDefs[col.columnIndex].name === "cr549_cms_office"){
			return <Text style={{ backgroundColor: "blue", color: "white" }}>{props.formattedValue}</Text>;
		}
	}
};
