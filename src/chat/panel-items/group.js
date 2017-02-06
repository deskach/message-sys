import React, {Component, PropTypes} from "react";
import BaseItem from "./base";

export default class Group extends BaseItem {
  render() {
    return (
      <div className="panel-item panel-item-group">{this.props.title}</div>
    )
  }
}

