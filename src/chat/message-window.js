import React, {Component, PropTypes} from "react";
import Draggable, {DraggableCore} from "react-draggable"; // Both at the same time
import Message from "./message";
import {uid} from "./util";

export default class MessageWindow extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    children: PropTypes.array,
    onAddNewMessage: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  static defaultProps = {
    style: {},
    children: [],
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

  render() {
    const dragHandlers = {};

    return (
      <Draggable handle="header" {...dragHandlers}>
        <div className="box no-cursor" style={this.props.style}>
          <header className="cursor">
            <strong>{this.props.title}</strong>
            <span className="chat-window-close" onClick={this.props.onClose}>&#x2716;</span>
          </header>
          <div id="content">
            {this.renderMessages()}
          </div>
          <footer>
            <input type="text" placeholder="Type here..." ref={r => this.msgInput = r}/>
            <span className="pointer send" onClick={e => this.addNewMessage(e)}>&#x27a4;</span>
          </footer>
        </div>
      </Draggable>
    );
  }
}

