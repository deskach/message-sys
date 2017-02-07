import React, {Component, PropTypes} from "react";
import BaseItem from "./base";

export default class Group extends BaseItem {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    selected: PropTypes.bool,
  };
  static defaultProps = {
    selected: false,
  };

  render() {
    let classNames = "panel-item panel-item-group ";

    if (this.props.selected) {
      classNames += ' panel-item-group-selected';
    }

    return (
      <div className={classNames} onClick={this.props.onClick}>
        {this.props.title}
      </div>
    )
  }
}

