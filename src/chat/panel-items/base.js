import React, {Component, PropTypes} from "react";

/*Abstract base class for group and contact panel items*/
export default class BaseItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    msgCount: PropTypes.number
  };
  static defaultProps = {
    msgCount: 0,
  };
}

