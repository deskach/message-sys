import React, {Component, PropTypes} from "react";
import BaseItem from "./base";

export default class Group extends BaseItem {
  static propTypes = {
    ...BaseItem.propTypes,
    contentEditable: PropTypes.bool,
    onKeyDown: PropTypes.func,
  };
  static defaultProps = {
    ...BaseItem.defaultProps,
    contentEditable: false,
  };

  componentDidMount() {
    if (this.props.contentEditable) {
      let range = document.createRange();
      range.selectNodeContents(this.contentEl);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }

  render() {
    let classNames = "panel-item panel-item-group ";
    let style = {};

    if (this.props.selected) {
      classNames += ' panel-item-group-selected';
    }

    if (this.props.contentEditable) {
      style.cursor = 'default';
    }

    return (
      <div className={classNames}
           style={style}
           onClick={this.props.onClick}
           onKeyDown={this.props.onKeyDown}
           ref={r => this.contentEl = r}
           contentEditable={this.props.contentEditable}>
        {this.props.title}
      </div>
    )
  }
}

