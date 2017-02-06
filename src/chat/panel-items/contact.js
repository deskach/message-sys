import React, {Component, PropTypes} from "react";
import BaseItem from "./base";

const CONTACT_TYPE = {TEACHER: 1, STUDENT: 2};

export default class Contact extends BaseItem {
  static propTypes = {
    type: PropTypes.number,
  };
  static defaultProps = {
    type: CONTACT_TYPE.STUDENT,
  };
  static TYPE = CONTACT_TYPE;

  render() {
    const type2style = {
      [Contact.TYPE.STUDENT]: 'panel-item-student',
      [Contact.TYPE.TEACHER]: 'panel-item-teacher',
    };
    const typeStyle = type2style[this.props.type];

    return (
      <div className={"panel-item panel-item-contact " + typeStyle}>{this.props.title}</div>
    )
  }
}
