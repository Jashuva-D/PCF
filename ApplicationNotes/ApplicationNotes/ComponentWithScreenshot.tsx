import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Stack, PrimaryButton, Label } from "@fluentui/react";

const CommentWithResizableImages: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [htmlContent, setHtmlContent] = useState("");

  // Enable contentEditable image resizing
  useEffect(() => {
    // Some browsers (like Chrome) support this execCommand
    document.execCommand("enableObjectResizing", false, "true");
  }, []);

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items as any;
    let handled = false;

    if (items) {
      for (const item of items) {
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const img = document.createElement("img");
              img.src = event.target?.result as string;
              img.style.maxWidth = "100%";
              img.style.borderRadius = "8px";
              img.style.margin = "4px 0";
              img.style.display = "block";
              img.style.cursor = "pointer";

              const sel = window.getSelection();
              if (sel && sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                range.insertNode(img);
                range.collapse(false);
              } else {
                editorRef.current?.appendChild(img);
              }

              // Allow manual resizing
              img.setAttribute("contenteditable", "false");
              img.style.resize = "both";
              img.style.overflow = "auto";
            };
            reader.readAsDataURL(file);
            handled = true;
          }
        }
      }
    }

    if (handled) e.preventDefault();
  };

  const handleSave = () => {
    setHtmlContent(editorRef.current?.innerHTML || "");
  };

  return (
    <Stack tokens={{ childrenGap: 12 }} style={{ width: "100%", maxWidth: 600 }}>
      <Label>Comment (paste screenshot using Ctrl+V)</Label>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onPaste={handlePaste}
        style={{
          minHeight: 150,
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          outline: "none",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
          backgroundColor: "#fff",
          resize: "none",
        }}
      ></div>

      <PrimaryButton text="Save" onClick={handleSave} />

      {htmlContent && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fafafa",
          }}
        >
          <Label>Preview:</Label>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      )}
    </Stack>
  );
};

export default CommentWithResizableImages;
