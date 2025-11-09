// ...existing code...
import * as React from "react";
import { Component } from "react";
import { Link, TextField } from "@fluentui/react";
import RichText from "./RichText";

export interface CommentProps {
  text: string;
  editmode: boolean;
}

interface CommentState {
  expanded: boolean;
  editText: string;
  canExpand: boolean; 
}

export default class Comment extends Component<CommentProps, CommentState> {
  
  textRef = React.createRef<HTMLDivElement>();

  constructor(props: CommentProps) {
    super(props);
    this.state = {
      expanded: false,
      editText: props.text ?? "",
      canExpand: false,
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => this.measureOverflow());
  }

  componentDidUpdate(prevProps: CommentProps, prevState: CommentState) {
    if (prevProps.text !== this.props.text) {
      this.setState(
        { editText: this.props.text ?? "", expanded: false, canExpand: false },
        () => requestAnimationFrame(() => this.measureOverflow())
      );
      return;
    }

    if (!this.state.expanded && (prevState.expanded !== this.state.expanded || prevProps.text === this.props.text)) {
      requestAnimationFrame(() => this.measureOverflow());
    }
  }

  measureOverflow = () => {
    const el = this.textRef.current;
    if (!el) return;
    const overflowing = el.scrollHeight > el.clientHeight + 1;
    if (overflowing && !this.state.canExpand) {
      this.setState({ canExpand: true });
    }
  };

  toggleExpanded = () => {
    this.setState((s) => ({ expanded: !s.expanded }));
  };

  onEditChange = (ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ editText: newValue ?? "" });
  };

  render() {
    const { text, editmode } = this.props;
    const { expanded, editText, canExpand } = this.state;

    const clampStyle: React.CSSProperties = {
      display: "-webkit-box",
      WebkitLineClamp: 2 as any,
      WebkitBoxOrient: "vertical" as any,
      overflow: "hidden",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    };

    const fullStyle: React.CSSProperties = {
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    };

    if (editmode) {
      return (
        // <TextField
        //   multiline
        //   value={editText}
        //   onChange={this.onEditChange}
        //   style={{ width: 1000 }}
        // />
        <RichText
          context={undefined as any}
          closeCallBack={this.toggleExpanded}
          submitCallBack={this.toggleExpanded}
          content={editText}
        />
      );
    }

    const safeHtml = text ?? "";

    return (
      <>
        <div
          ref={this.textRef}
          style={expanded ? fullStyle : clampStyle}
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />

        {canExpand && (
          <Link onClick={this.toggleExpanded} style={{ marginLeft: 8, cursor: "pointer", fontWeight: 500 }}>
            {expanded ? " Read Less" : " Read More"}
          </Link>
        )}
      </>
    );
  }
}