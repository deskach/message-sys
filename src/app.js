import React, {Component} from "react";
import PanelContainer from "./chat/panel-container";
import Panel from "./chat/panel";

export default class App extends Component {
  state = {panels: []};

  componentWillMount() {
    const panelStyle = {maxHeight: '50%'};
    this.setState({
      panels: [
        <Panel title='Groups' style={panelStyle} key="Groups"/>,
        <Panel title='Contacts' style={panelStyle} key="Contacts"/>
      ]
    });
  }

  render() {
    return (
      <div>
        <PanelContainer>
          {this.state.panels}
        </PanelContainer>
      </div>
    );
  }
}
