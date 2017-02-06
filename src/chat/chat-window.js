import React, {Component, PropTypes} from "react";
import Draggable, {DraggableCore} from "react-draggable"; // Both at the same time

export default class MessageWindow extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
  };
  static defaultProps = {
    style: {},
  };

  render() {
    const dragHandlers = {};

    return (
      <Draggable handle="header" {...dragHandlers}>
        <div className="box no-cursor" style={this.props.style}>
          <header className="cursor">
            <strong>{this.props.title}</strong>
          </header>
          <div id="content"></div>
          <footer>
            <input type="text" placeholder="Type here..."/>
            <span className="pointer send">&#x27a4;</span>
          </footer>
        </div>
      </Draggable>
    );
  }
}

