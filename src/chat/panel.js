import React, {Component, PropTypes} from "react";

export default class Panel extends Component {
  propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
  };

  defaultProps = {
    title: '',
    style: {}
  };

  render() {
    return (
      <div style={this.props.style}>
        <div> {this.props.title} </div>
        <div> {this.props.children} </div>
      </div>
    );
  }
}
