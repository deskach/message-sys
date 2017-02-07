import React, {Component} from "react";
import PanelContainer from "./panel-container";
import Panel from "./panel";
import ContactItem from "./panel-items/contact";
import GroupItem from "./panel-items/group";
import {uid} from "./util";
import ChatWindow from "./message-window";

// TODO: Replace this mock and all related code with the database values
const GROUP = ["Project A", "Group Task", "All Classes"];
const STUDENT = ["Harry Potter", "Hermione Granger", "Ron Wesley", "Draco Malfoy", "Tom Riddle"];
const TEACHER = ["Dr. Severus Snape", "Prof. Dumbledore",];

export default class App extends Component {
  grContacts = {
    [GROUP[0]]: [TEACHER[0], TEACHER[1], STUDENT[0], STUDENT[1]],
    [GROUP[1]]: [STUDENT[1], STUDENT[2], STUDENT[3]],
    [GROUP[2]]: STUDENT,
  };

  state = {
    groups: [GROUP[0], GROUP[1], GROUP[2]],
    selectedGroup: GROUP[0],
    activeChats: [STUDENT[0]],
  };

  messages = {
    [STUDENT[0]]: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante. Mauris eleifend, quam a vulputate dictum, massa quam dapibus leo, eget vulputate orci purus ut lorem. In fringilla mi in ligula. Pellentesque aliquam quam vel dolor. Nunc adipiscing. Sed quam odio, tempus ac, aliquam molestie, varius ac, tellus. Vestibulum ut nulla aliquam risus rutrum interdum. Pellentesque lorem. Curabitur sit amet erat quis risus feugiat viverra. Pellentesque augue justo, sagittis et, lacinia at, venenatis non, arcu. Nunc nec libero. In cursus dictum risus. Etiam tristique nisl a nulla. Ut a orci. Curabitur dolor nunc, egestas at, accumsan at, malesuada nec, magna.",
      "Nulla facilisi. Nunc volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut sit amet orci vel mauris blandit vehicula. Nullam quis enim. Integer dignissim viverra velit. Curabitur in odio. In hac habitasse platea dictumst. Ut consequat, tellus eu volutpat varius, justo orci elementum dolor, sed imperdiet nulla tellus ut diam. Vestibulum ipsum ante, malesuada quis, tempus ac, placerat sit amet, elit.",
    ]
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
    return this.grContacts[this.state.selectedGroup].map(name => {
      const type = TEACHER.indexOf(name) >= 0 ? ContactItem.TYPE.TEACHER : ContactItem.TYPE.STUDENT;

      return <ContactItem type={type}
                          key={name}
                          onClick={this.toggleChatWindow.bind(this, name)}
                          title={name}/>
    });
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
      <ChatWindow title={name} key={name} style={{left: 10, top: 10}}>
        {this.messages[name]}
      </ChatWindow>
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
