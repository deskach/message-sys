import React, {Component, PropTypes} from "react";
import Draggable, {DraggableCore} from "react-draggable"; // Both at the same time

export default class MessageWindow extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
  };
  static defaultProps = {
    style: {},
  };

  render() {
    const dragHandlers = {};

    return (
      <Draggable handle="header" {...dragHandlers}>
        <div className="box no-cursor" style={this.props.style}>
          <header className="cursor">
            <strong>{this.props.title}</strong>
          </header>
          <div id="content">
            {/*<p>*/}
            {/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante. Mauris eleifend, quam a vulputate dictum, massa quam dapibus leo, eget vulputate orci purus ut lorem. In fringilla mi in ligula. Pellentesque aliquam quam vel dolor. Nunc adipiscing. Sed quam odio, tempus ac, aliquam molestie, varius ac, tellus. Vestibulum ut nulla aliquam risus rutrum interdum. Pellentesque lorem. Curabitur sit amet erat quis risus feugiat viverra. Pellentesque augue justo, sagittis et, lacinia at, venenatis non, arcu. Nunc nec libero. In cursus dictum risus. Etiam tristique nisl a nulla. Ut a orci. Curabitur dolor nunc, egestas at, accumsan at, malesuada nec, magna.*/}
            {/*Nulla facilisi. Nunc volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut sit amet orci vel mauris blandit vehicula. Nullam quis enim. Integer dignissim viverra velit. Curabitur in odio. In hac habitasse platea dictumst. Ut consequat, tellus eu volutpat varius, justo orci elementum dolor, sed imperdiet nulla tellus ut diam. Vestibulum ipsum ante, malesuada quis, tempus ac, placerat sit amet, elit.*/}
            {/*</p>*/}
            <div className="chat-message">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante. Mauris eleifend, quam a vulputate
              dictum, massa quam dapibus leo, eget vulputate orci purus ut lorem. In fringilla mi in ligula.
              Pellentesque aliquam quam vel dolor. Nunc adipiscing. Sed quam odio, tempus ac, aliquam molestie, varius
              ac, tellus. Vestibulum ut nulla aliquam risus rutrum interdum. Pellentesque lorem. Curabitur sit amet erat
              quis risus feugiat viverra. Pellentesque augue justo, sagittis et, lacinia at, venenatis non, arcu. Nunc
              nec libero. In cursus dictum risus. Etiam tristique nisl a nulla. Ut a orci. Curabitur dolor nunc, egestas
              at, accumsan at, malesuada nec, magna.
            </div>
            <div className="chat-message">
              Nulla facilisi. Nunc volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
              cubilia Curae; Ut sit amet orci vel mauris blandit vehicula. Nullam quis enim. Integer dignissim viverra
              velit. Curabitur in odio. In hac habitasse platea dictumst. Ut consequat, tellus eu volutpat varius, justo
              orci elementum dolor, sed imperdiet nulla tellus ut diam. Vestibulum ipsum ante, malesuada quis, tempus
              ac, placerat sit amet, elit.
            </div>
          </div>
          <footer>
            <input type="text" placeholder="Type here..."/>
            <span className="pointer send">&#x27a4;</span>
          </footer>
        </div>
      </Draggable>
    );
  }
}

