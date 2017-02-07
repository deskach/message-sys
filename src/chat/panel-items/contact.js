import React, {Component, PropTypes} from "react";
import BaseItem from "./base";

const CONTACT_TYPE = {TEACHER: 1, STUDENT: 2, GROUP: 3};

export default class Contact extends BaseItem {
  static propTypes = {
    ...BaseItem.propTypes,
    type: PropTypes.number,
    onClick: PropTypes.func,
  };
  static defaultProps = {
    ...BaseItem.defaultProps,
    type: CONTACT_TYPE.STUDENT,
  };
  static TYPE = CONTACT_TYPE;

  render() {
    const type2style = {
      [Contact.TYPE.STUDENT]: 'panel-item-student',
      [Contact.TYPE.TEACHER]: 'panel-item-teacher',
      [Contact.TYPE.GROUP]: 'panel-item-teacher',
    };
    const typeStyle = type2style[this.props.type];

    return (
      <div className={"panel-item panel-item-contact " + typeStyle}
           onClick={this.props.onClick}
      >
        {this.props.title}
      </div>
    )
  }
}
