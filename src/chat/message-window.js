import React, {Component, PropTypes} from "react";
import Draggable, {DraggableCore} from "react-draggable"; // Both at the same time
import Message from "./message";
import {uid} from "./util";
import constants from "./constants";

export default class MessageWindow extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    children: PropTypes.array,
    onAddNewMessage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    icon: PropTypes.any,
  };
  static defaultProps = {
    style: {},
    children: [],
    icon: <span className="chat-window-icon left">{constants.PERSON}</span>,
  };

  renderMessages() {
    return this.props.children.map(text => <Message key={uid()}>{text}</Message>);
  }

  addNewMessage(e) {
    e.preventDefault();
    const msg = this.msgInput.value.trim();

    if (msg) {
      this.props.onAddNewMessage(this.props.title, msg);
      this.msgInput.value = "";
    }
  }

  componentDidMount() {
    this.contentEl.scrollTop = Number.MAX_SAFE_INTEGER;
  }

  componentDidUpdate() {
    this.contentEl.scrollTop = Number.MAX_SAFE_INTEGER;
  }

  render() {
    const dragHandlers = {};

    return (
      <Draggable handle="header" {...dragHandlers}>
        <div className="box no-cursor" style={this.props.style}>
          <header className="cursor">
            <span className="chat-window-icon left">{this.props.icon}</span>
            <strong className="chat-window-title">{this.props.title}</strong>
            <span className="chat-window-icon right" onClick={this.props.onClose}>{constants.CLOSE}</span>
          </header>
          <div id="content" ref={r => this.contentEl = r}>
            {this.renderMessages()}
          </div>
          <footer>
            <input type="text"
                   placeholder="Type here..."
                   onKeyDown={e => e.keyCode === 13 ? this.addNewMessage(e) : null}
                   ref={r => this.msgInput = r}/>
            <span className="pointer send" onClick={e => this.addNewMessage(e)}>{constants.SEND}</span>
          </footer>
        </div>
      </Draggable>
    );
  }
}

