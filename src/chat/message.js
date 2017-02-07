import React, {Component, PropTypes} from "react";

export default class Message extends Component {
  static propTypes = {
    children: PropTypes.string,
  };
  static defaultProps = {};

  render() {
    return (
      <div className="chat-message">
        {this.props.children}
      </div>
    );
  }
}
