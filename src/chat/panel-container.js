import React, {Component, PropTypes} from "react";


export default class PanelContainer extends Component {
  static propTypes = {};
  static defaultProps = {};

  render() {
    return (
      <div className="panel-container">
        {this.props.children}
      </div>
    );
  }
}

