
import * as React from "react";
import { useState } from "react";
import { PrimaryButton, Dialog, DialogType } from "@fluentui/react";


function TestComponent() {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000); // simulate API
    };

    return (
    <>
        {/* <PrimaryButton text="Submit" onClick={() => setLoading(true)} />
        <Dialog
        hidden={!loading}
        dialogContentProps={{
            type: DialogType.normal,
            title: "Loading...",
            subText: "Please wait..."
        }}
        /> */}
        <PrimaryButton text="Submit" onClick={handleClick} />

        {loading && (
  <>
    {/* 🔒 Background overlay to disable clicks */}
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.2)",  // dim background
        zIndex: 9998,                            // behind popup
        pointerEvents: "all",                    // block clicks
      }}
    />

    {/* 🔵 Loading box */}
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "25px 40px",
        background: "#eaffea",
        border: "4px solid #1a8f1a",
        borderRadius: "10px",
        color: "#1a8f1a",
        fontSize: "20px",
        fontWeight: "700",
        boxShadow: "0 0 15px rgba(0,0,0,0.25)",
        zIndex: 9999,        // above overlay
        textAlign: "center",
        minWidth: "180px",
      }}
    >
      Loading...
    </div>
  </>
)}


    </>
    );
}

export default TestComponent;


