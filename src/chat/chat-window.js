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
      <Draggable handle="strong" {...dragHandlers}>
        <div className="box no-cursor" style={this.props.style}>
          <strong className="cursor">
            <div>{this.props.title}</div>
          </strong>
          <div>You must click my handle to drag me</div>
        </div>
      </Draggable>
    );
  }
}

