import { Label, Text, Stack, Toggle } from "@fluentui/react";
import * as React from "react";
import { CellRendererProps, CellRendererOverrides } from "../types";

export const cellRendererOverrides: CellRendererOverrides = {
	["DateOnly"]: (props: CellRendererProps, col) => {
    if (col.colDefs[col.columnIndex].name === "dinb_invoicedate") {
      return <Stack verticalAlign="center" horizontalAlign="center" style={{height: "100%", paddingLeft: "8px"}}><Text>{props.formattedValue ?? ""}</Text></Stack>
    }
    if (col.colDefs[col.columnIndex].name == "dinb_servicedate"){
      return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text>{props.formattedValue ?? ""}</Text></Stack>
    }
  },
  ["DateAndTime"]: (props: CellRendererProps, col) => {
    if (col.colDefs[col.columnIndex].name === "dinb_invoicedate") {
      return <Stack verticalAlign="center" horizontalAlign="center" style={{height: "100%", paddingLeft: "8px"}}><Text>{props.formattedValue ?? "date and time"}</Text></Stack>
    }
    if (col.colDefs[col.columnIndex].name == "dinb_servicedate"){
      return <Stack verticalAlign="center" horizontalAlign="start" style={{height: "100%", paddingLeft: "8px"}}><Text>{props.formattedValue ?? "date and time"}</Text></Stack>
    }
  }
};
