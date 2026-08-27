import { TextField } from "@fluentui/react";
import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const PopupPortal: React.FC<Props> = ({ open, onClose, children }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    // <div className="fullscreen-container1">
    //   <div className="popup-content">
        
    //   </div>
    // </div>,
    <div className="fullscreen-container1">
      <TextField label="Test" className="popup-content"></TextField>  
    </div>,
    
    document.body   // 🚀 THIS IS THE FIX
  );
};
