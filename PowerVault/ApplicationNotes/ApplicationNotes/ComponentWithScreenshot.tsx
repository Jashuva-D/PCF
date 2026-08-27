import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Stack, PrimaryButton, Label, StackItem, DefaultButton } from "@fluentui/react";

interface CommentWithResizableImagesProps {
  onSubmit?: (html: string) => void;
  onCancel?: () => void;
}

const CommentWithResizableImages: React.FC<CommentWithResizableImagesProps> = (props : CommentWithResizableImagesProps) => {
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
              img.style.width = "100%";
              img.style.height = "auto";
              img.style.borderRadius = "8px";
              img.style.display = "block";
              img.style.cursor = "pointer";

              const wrapper = document.createElement("div");
              wrapper.setAttribute("contenteditable", "false");
              wrapper.style.display = "inline-block";
              wrapper.style.resize = "both";
              wrapper.style.overflow = "auto";
              wrapper.style.maxWidth = "100%";
              wrapper.style.borderRadius = "8px";
              wrapper.style.margin = "4px 0";

              wrapper.appendChild(img);

              const sel = window.getSelection();
              if (sel && sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                range.insertNode(wrapper);
                range.collapse(false);
              } else {
                editorRef.current?.appendChild(wrapper);
              }
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
    <Stack tokens={{ childrenGap: 10 }} style={{ width: "100%" }}>
      <StackItem>
        <div
          ref={editorRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
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
            //resize: "none",
          }}
        ></div>
      </StackItem>
      <StackItem align="end">
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <StackItem>
            <PrimaryButton text="Submit" onClick={handleSave} style={{ borderRadius: 6 }}  />
          </StackItem>
          <StackItem>
            <DefaultButton text="Cancel" onClick={() => { setHtmlContent(""); props.onCancel && props.onCancel(); }} style={{ borderRadius: 6 }} />
          </StackItem>
        </Stack>
      </StackItem>
      {/* {htmlContent && (
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
      )} */}
    </Stack>
  );

};

export default CommentWithResizableImages;
