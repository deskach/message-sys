import React, {Component} from "react";
import PanelContainer from "./chat/panel-container";
import Panel from "./chat/panel";

export default class App extends Component {
  render() {
    const maxPanelHeight = '50%';
    const panelStyle = {maxHeight: maxPanelHeight};

    return (
      <div>
        <PanelContainer>
          <Panel title='Groups' style={panelStyle}/>
          <Panel title='Contacts' style={panelStyle}/>
        </PanelContainer>
      </div>
    );
  }
}
