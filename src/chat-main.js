import React, {Component} from "react";
import PanelContainer from "./chat/panel-container";
import Panel from "./chat/panel";
import ContactItem from "./chat/panel-items/contact";
import GroupItem from "./chat/panel-items/group";
import {uid} from "./util";

// TODO: Replace this mock and all related code with the database values
const GR_TITLE1 = "Project A";
const GR_TITLE2 = "Group Task";
const GR_TITLE3 = "All Classes";

export default class App extends Component {
  grContacts = {
    [GR_TITLE1]: [
      <ContactItem key={uid()} type={ContactItem.TYPE.TEACHER} title="Academic A"/>,
      <ContactItem key={uid()} type={ContactItem.TYPE.TEACHER} title="Doctor B"/>,
      <ContactItem key={uid()} title="Student Helen"/>,
      <ContactItem key={uid()} title="Student Nick"/>,
    ],
    [GR_TITLE2]: [
      <ContactItem key={uid()} title="Student John"/>,
      <ContactItem key={uid()} title="Student Malcolm"/>,
      <ContactItem key={uid()} title="Student Thomas"/>,
    ],
    [GR_TITLE3]: [
      <ContactItem key={uid()} title="Student Helen"/>,
      <ContactItem key={uid()} title="Student Nick"/>,
      <ContactItem key={uid()} title="Student John"/>,
      <ContactItem key={uid()} title="Student Malcolm"/>,
      <ContactItem key={uid()} title="Student Thomas"/>,
    ],
  };

  state = {
    groups: [GR_TITLE1, GR_TITLE2, GR_TITLE3],
    selectedGroup: GR_TITLE1,
  };

  onGroupClick(title) {
    this.setState({selectedGroup: title});
  }

  renderGroups() {
    return this.state.groups.map(
      title => <GroupItem key={uid()} title={title} onClick={this.onGroupClick.bind(this, title)}/>
    );
  }

  renderContacts() {
    return this.grContacts[this.state.selectedGroup];
  }

  render() {
    const panelStyle = {maxHeight: '50%'};

    return (
      <PanelContainer>
        <Panel title='Groups' style={panelStyle} key="Groups">
          {this.renderGroups()}
        </Panel>,
        <Panel title='Contacts' style={panelStyle} key="Contacts">
          {this.renderContacts()}
        </Panel>
      </PanelContainer>
    );
  }
}
