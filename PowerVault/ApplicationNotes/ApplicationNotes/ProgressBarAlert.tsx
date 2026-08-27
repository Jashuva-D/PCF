import * as React from "react";

interface ProgressBarAlertProps {
    message: string
}
interface ProgressBarAlertState {

}

class ProgressBarAlert extends React.Component<ProgressBarAlertProps,ProgressBarAlertState>{
    constructor(props: ProgressBarAlertProps){
        super(props);
    }
    render(): React.ReactNode {
        return  <>
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.2)", 
                        zIndex: 9998,                            
                        pointerEvents: "all",                    
                    }}
                />
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
                        zIndex: 9999,       
                        textAlign: "center",
                        minWidth: "180px",
                    }}
                >
                {this.props.message}
                </div>
            </>
    }
}

export default ProgressBarAlert;