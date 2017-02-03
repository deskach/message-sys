import React, {Component, PropTypes} from "react";

export default class Panel extends Component {
  propTypes = {
    title: PropTypes.string
  };

  defaultProps = {
    title: ''
  };

  render() {
    return (
      <div>
        Base Panel with custom header
      </div>
    );
  }
}
