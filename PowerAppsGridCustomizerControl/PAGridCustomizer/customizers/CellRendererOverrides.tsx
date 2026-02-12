import { Label, Text, Stack, Toggle } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const cellRendererOverrides: CellRendererOverrides = {
	["Text"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_cms_group" && props.formattedValue != null && props.formattedValue != "") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "5px"}}><Text style={{backgroundColor: "#EBE8CE", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
		else if(col.colDefs[col.columnIndex].name === "cr549_cms_office" && props.formattedValue != null && props.formattedValue != "") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "5px"}}><Text style={{backgroundColor: "#E6C8DB", paddingLeft: "8px", paddingRight: "8px", borderRadius: "4px"}}>{props.formattedValue}</Text></Stack>;
		}
	},
	["TwoOptions"]: (props: CellRendererProps, col) => {
		if (col.colDefs[col.columnIndex].name === "cr549_marketplace") {
			return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "5px"}}>
				<Toggle
                  style={{marginLeft: "5px", border: "none"}}
				          checked={props.value == 1}
				          inlineLabel label= {props.value == 1 ? "Yes" : "No"}
				          styles={{
                    label: { order: 1 },
                    root: {
                      selectors: {
                        "&:hover .ms-Toggle-thumb": {
                          backgroundColor: props.value == 1 ? "#C6F6DB" : "#ffffff !important"
                        }
                      }
                    },
                    thumb: {
                      backgroundColor: props.value == 1 ? "#C6F6DB" : "#ffffff",
                      color: "red",
                      height: 20, width: 20, padding: 1,
                      selectors: {
                        ":hover": {
                          backgroundColor: props.value == 1 ? "#C6F6DB" : "#ffffff"   
                        },

                        '[aria-checked="true"] &': {
                          backgroundColor: props.value == 1 ? "#C6F6DB" : "#ffffff"
                        },

                        '[aria-checked="true"]:hover &': {
                          backgroundColor: props.value == 1 ? "#C6F6DB" : "#ffffff"   
                        }
                      }
                    },
                    container: { display: 'flex', flexDirection: 'row-reverse' },
                    pill: {
                      backgroundColor: props.value == 1 ? "#7BEBAC" : "rgb(211,211,211)",
                      height: 24, padding: 0, width: 44, borderRadius: 12,
                      selectors: {
                        ':hover': { backgroundColor: props.value == 1 ? "#7BEBAC" : "#e6e6e6" }
                      },
                      border: "1px solid",
                      alignItems: "center"
                    }

                  }}
                />
			</Stack>;
		}
	}
};
