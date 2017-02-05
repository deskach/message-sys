import React, {Component, PropTypes} from "react";

export default class BaseItem extends Component {
  static propTypes = {
    msgCount: PropTypes.number
  };

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

