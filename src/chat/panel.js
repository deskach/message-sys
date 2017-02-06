import React, {Component, PropTypes} from "react";

export default class Panel extends Component {
  static propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    title: '',
    style: {}
  };

  render() {
    return (
      <div style={this.props.style} className="panel">
        <div className="panel-title"> {this.props.title} </div>
        <div className="panel-content"> {this.props.children} </div>
      </div>
    );
  }
}
