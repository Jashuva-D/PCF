// ...existing code...
import * as React from "react";
import { Component } from "react";
import { Link, TextField } from "@fluentui/react";
import NoteForm from "./NoteForm";

export interface CommentProps {
  context: ComponentFramework.Context<any>;
  recordid?: string;
  text: string;
  editmode: boolean;
}

interface CommentState {
  expanded: boolean;
  canExpand: boolean; 
}

export default class Comment extends Component<CommentProps, CommentState> {
  
  textRef = React.createRef<HTMLDivElement>();

  constructor(props: CommentProps) {
    super(props);
    this.state = {
      expanded: false,
      canExpand: false,
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => this.measureOverflow());
  }

  componentDidUpdate(prevProps: CommentProps, prevState: CommentState) {
    if (prevProps.text !== this.props.text) {
      this.setState(
        { expanded: false, canExpand: false },
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

  render() {
    const { text } = this.props;
    const { expanded, canExpand } = this.state;

    const clampStyle: React.CSSProperties = {
      display: "-webkit-box",
      WebkitLineClamp: 2 as any,
      WebkitBoxOrient: "vertical" as any,
      overflow: "hidden",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      paddingTop: 10
    };

    const fullStyle: React.CSSProperties = {
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      paddingTop: 10
    };
    
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