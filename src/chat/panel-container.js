import React, {Component, PropTypes} from "react";


export default class PanelContainer extends Component {
  propTypes = {};

  defaultProps = {};

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

