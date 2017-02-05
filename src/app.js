import React, {Component} from "react";
import PanelContainer from "./chat/panel-container";
import Panel from "./chat/panel";
import ContactItem from "./chat/panel-items/contact";
import GroupItem from "./chat/panel-items/contact";
import {uid} from "./util";

export default class App extends Component {
  state = {
    panels: [], panelItems: {
      groups: [
        <GroupItem key={uid()}>Project A</GroupItem>,
        <GroupItem key={uid()}>Group Task</GroupItem>,
        <GroupItem key={uid()}>All Class</GroupItem>,
      ],
      contacts: [
        <ContactItem key={uid()}>Academic A</ContactItem>,
        <ContactItem key={uid()}>Doctor B</ContactItem>,
        <ContactItem key={uid()}>Student 1</ContactItem>,
        <ContactItem key={uid()}>Student 2</ContactItem>,
      ],
    }
  };

  componentWillMount() {
    const panelStyle = {maxHeight: '50%'};

    this.setState({
      panels: [
        <Panel title='Groups' style={panelStyle} key="Groups">{this.state.panelItems.groups}</Panel>,
        <Panel title='Contacts' style={panelStyle} key="Contacts">{this.state.panelItems.contacts}</Panel>
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
