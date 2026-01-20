import { Label, Text, Stack, Toggle } from "@fluentui/react";
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
	},
	["TwoOptions"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_marketplace") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%"}}>
				<Toggle inlineLabel label="Yes"
					styles={{
						label: {order: 1}, 
						root: {
							selectors: {
								"&:hover .ms-Toggle-thumb": {
								backgroundColor: "#ffffff !important"
								}
							},
						},
						thumb: {
							backgroundColor: "#ffffff",
							height: 20, width: 20, padding: 1,
							selectors: {
								":hover": {
								backgroundColor: "#ffffff"   // 🔒 keep same color
								},
								'[aria-checked="true"] &': {
									backgroundColor: "#ffffff"
								},
								'[aria-checked="true"]:hover &': {
									backgroundColor: "#ffffff"   // 🔒 even when ON + hover
								}      
							}	
						}, 
						container: {display: 'flex', flexDirection: 'row-reverse'},
						pill: {
							backgroundColor: props.value ? "#CFEAD9" : "#EBCBCB", 
							height: 24, padding: 0, width: 44, borderRadius: 12, 
							selectors: {
								':hover': { backgroundColor: props.value ? "#CFEAD9" : "#EBCBCB" }
							}
						}
							
					}}
            	/>
			</Stack>;
		}
	}
};
