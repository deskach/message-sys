import React, {Component} from "react";
import PanelContainer from "./panel-container";
import Panel from "./panel";
import ContactItem from "./panel-items/contact";
import GroupItem from "./panel-items/group";
import {uid} from "./util";
import ChatWindow from "./chat-window";

// TODO: Replace this mock and all related code with the database values
const GROUP = ["Project A", "Group Task", "All Classes"];
const STUDENT = ["Harry Potter", "Hermione Granger", "Ron Wesley", "Draco Malfoy", "Tom Riddle"];
const TEACHER = ["Dr. Severus Snape", "Prof. Dumbledore",];

export default class App extends Component {
  grContacts = {
    [GROUP[0]]: [
      <ContactItem key={uid()}
                   type={ContactItem.TYPE.TEACHER}
                   title={TEACHER[0]}
                   onClick={this.toggleChatWindow.bind(this, TEACHER[0])}/>,
      <ContactItem key={uid()}
                   type={ContactItem.TYPE.TEACHER}
                   title={TEACHER[1]}
                   onClick={this.toggleChatWindow.bind(this, TEACHER[1])}/>,
      <ContactItem key={uid()} title={STUDENT[0]} onClick={this.toggleChatWindow.bind(this, STUDENT[0])}/>,
      <ContactItem key={uid()} title={STUDENT[1]} onClick={this.toggleChatWindow.bind(this, STUDENT[1])}/>,
    ],
    [GROUP[1]]: [
      <ContactItem key={uid()} title={STUDENT[1]} onClick={this.toggleChatWindow.bind(this, STUDENT[1])}/>,
      <ContactItem key={uid()} title={STUDENT[2]} onClick={this.toggleChatWindow.bind(this, STUDENT[2])}/>,
      <ContactItem key={uid()} title={STUDENT[3]} onClick={this.toggleChatWindow.bind(this, STUDENT[3])}/>,
    ],
    [GROUP[2]]: STUDENT.map(name => <ContactItem key={uid()} title={name}/>),
  };

  state = {
    groups: [GROUP[0], GROUP[1], GROUP[2]],
    selectedGroup: GROUP[0],
    activeChats: [],
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

  toggleChatWindow(title) {
    let activeChats = this.state.activeChats;
    const n = activeChats.indexOf(title);

    if (n >= 0) {
      activeChats.splice(n, 1);
    } else {
      activeChats.push(title);
    }

    this.setState({activeChats});
  }

  renderChatWindows() {
    return this.state.activeChats.map(name => (
      <ChatWindow title={name} key={name} style={{left: 10, top: 10}}/>
    ));
  }

  render() {
    const panelStyle = {maxHeight: '50%'};

    return (
      <div>
        <PanelContainer>
          <Panel title='Groups' style={panelStyle} key="Groups">
            {this.renderGroups()}
          </Panel>,
          <Panel title='Contacts' style={panelStyle} key="Contacts">
            {this.renderContacts()}
          </Panel>
        </PanelContainer>
        {this.renderChatWindows()}
      </div>
    );
  }
}