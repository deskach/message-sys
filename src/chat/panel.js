import React, {Component, PropTypes} from "react";

export default class Panel extends Component {
  static propTypes = {
    title: PropTypes.string,
    controls: PropTypes.array,
    style: PropTypes.object,
  };

  static defaultProps = {
    title: '',
    controls: [],
    style: {}
  };

  render() {
    return (
      <div style={this.props.style} className="panel">
        <div className="panel-title">
          {this.props.title}
          {this.props.controls}
        </div>
        <div className="panel-content"> {this.props.children} </div>
      </div>
    );
  }
}
