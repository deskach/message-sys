import React, {Component, PropTypes} from "react";


export default class PanelContainer extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

