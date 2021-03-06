import React, {Component} from "react";
import PanelContainer from "./panel-container";
import Panel from "./panel";
import ContactItem from "./panel-items/contact";
import GroupItem from "./panel-items/group";
import {uid} from "./util";
import MessageWindow from "./message-window";
import constants from "./constants";

// TODO: Replace this mock and all related code with the database values
// TODO: Introduce a notion of id for a GROUP, a STUDENT etc and rely on it instead of the name
const GROUP = ["Project A", "Group Task", "All Classes", "Empty"];
const STUDENT = ["Harry Potter", "Hermione Granger", "Ron Wesley", "Draco Malfoy", "Tom Riddle"];
const TEACHER = ["Dr. Severus Snape", "Prof. Dumbledore",];
const ALL = 'Everyone...';

export default class App extends Component {
  grContacts = {
    [GROUP[0]]: [TEACHER[0], TEACHER[1], STUDENT[0], STUDENT[1]],
    [GROUP[1]]: [STUDENT[1], STUDENT[2], STUDENT[3]],
    [GROUP[2]]: STUDENT,
  };

  state = {
    groups: [...GROUP],
    selectedGroup: GROUP[0],
    activeChats: [],
    messages: {
      [STUDENT[0]]: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ante. Mauris eleifend, quam a vulputate dictum, massa quam dapibus leo, eget vulputate orci purus ut lorem. In fringilla mi in ligula. Pellentesque aliquam quam vel dolor. Nunc adipiscing. Sed quam odio, tempus ac, aliquam molestie, varius ac, tellus. Vestibulum ut nulla aliquam risus rutrum interdum. Pellentesque lorem. Curabitur sit amet erat quis risus feugiat viverra. Pellentesque augue justo, sagittis et, lacinia at, venenatis non, arcu. Nunc nec libero. In cursus dictum risus. Etiam tristique nisl a nulla. Ut a orci. Curabitur dolor nunc, egestas at, accumsan at, malesuada nec, magna.",
        "Nulla facilisi. Nunc volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut sit amet orci vel mauris blandit vehicula. Nullam quis enim. Integer dignissim viverra velit. Curabitur in odio. In hac habitasse platea dictumst. Ut consequat, tellus eu volutpat varius, justo orci elementum dolor, sed imperdiet nulla tellus ut diam. Vestibulum ipsum ante, malesuada quis, tempus ac, placerat sit amet, elit.",
      ]
    },
    isEditingContacts: false,
    isEditingGroup: false,
    selectedContacts: [],
  };
  groupBeingEdited = undefined;


  onGroupClick(title) {
    if (this.state.isEditingContacts) {
      this.cancelContactsEditing()
    }

    if (this.state.isEditingGroup) {
      this.cancelGroupEditing();
    }

    this.setState({selectedGroup: title});
  }

  //TODO: refactor this function to be part of the Group panel-item
  onGroupNameChange(e) {
    if (e.keyCode === 13) {
      this.renameSelectedGroup(this.groupBeingEdited.contentEl.innerText);
      this.cancelGroupEditing();
    } else if (e.keyCode === 27) {
      this.cancelGroupEditing();
    }
  }

  renderGroups() {
    return this.state.groups.map(
      title => {
        const contentEditable = this.state.selectedGroup === title && this.state.isEditingGroup;
        const onClick = contentEditable ? undefined : this.onGroupClick.bind(this, title);
        const onKeyDown = contentEditable ? this.onGroupNameChange.bind(this) : undefined;

        return <GroupItem key={uid()}
                          title={title}
                          ref={contentEditable ? r => this.groupBeingEdited = r : undefined}
                          selected={this.state.selectedGroup === title}
                          contentEditable={contentEditable}
                          onKeyDown={onKeyDown}
                          onClick={onClick}/>
      }
    );
  }

  renderContacts() {
    let contacts = this.grContacts[this.state.selectedGroup];
    contacts = contacts && contacts.length ? [ALL, ...contacts] : [];

    return contacts.map(name => {
      let type = ContactItem.TYPE.STUDENT;
      let msgWindowTitle = name;
      let selected = (this.state.activeChats.indexOf(name) >= 0) ? true : undefined;

      if (TEACHER.indexOf(name) >= 0) {
        type = ContactItem.TYPE.TEACHER;
      } else if (name === ALL) {
        type = ContactItem.TYPE.GROUP;
        msgWindowTitle = this.state.selectedGroup;

        if (this.state.activeChats.indexOf(msgWindowTitle) >= 0) {
          selected = true;
        }
      }

      return <ContactItem type={type}
                          key={name}
                          selected={selected}
                          onClick={this.toggleMessageWindow.bind(this, msgWindowTitle)}
                          title={name}/>
    });
  }

  renderContacts4Editing() {
    const toggleSelectedContact = (contact) => {
      let selectedContacts = [...this.state.selectedContacts];
      const pos = selectedContacts.indexOf(contact);

      if (pos >= 0) {
        selectedContacts.splice(pos, 1);
      } else {
        selectedContacts.push(contact);
      }

      this.setState({selectedContacts});
    };
    let contacts = [...TEACHER, ...STUDENT,];

    return contacts.map(name => {
      let type = ContactItem.TYPE.STUDENT;
      let selected = (this.state.selectedContacts.indexOf(name) >= 0);

      if (TEACHER.indexOf(name) >= 0) {
        type = ContactItem.TYPE.TEACHER;
      }

      return <ContactItem type={type}
                          key={name}
                          selected={selected}
                          onClick={toggleSelectedContact.bind(this, name)}
                          title={name}/>
    });
  }

  toggleMessageWindow(title) {
    let activeChats = this.state.activeChats;
    const n = activeChats.indexOf(title);

    if (n >= 0) {
      activeChats.splice(n, 1);
    } else {
      activeChats.push(title);
    }

    this.setState({activeChats});
  }

  addNewMessage(name, text) {
    let newMessages = {...this.state.messages};

    newMessages[name] = [...(newMessages[name] || []), text];
    this.setState({messages: newMessages});
  }

  renderMessageWindows() {
    return this.state.activeChats.map(name => {
      let icon = undefined;

      if (GROUP.indexOf(name) >= 0) {
        icon = <span className="chat-window-icon left">{constants.PERSONS}</span>;
      }

      return (
        <MessageWindow title={name}
                       key={name}
                       onAddNewMessage={(key, text) => this.addNewMessage(key, text)}
                       icon={icon}
                       onClose={this.toggleMessageWindow.bind(this, name)}
                       style={{left: 10, top: 10}}>
          {this.state.messages[name]}
        </MessageWindow>
      )
    });
  }

  cancelContactsEditing() {
    this.setState({isEditingContacts: false, selectedContacts: []})
  }

  cancelGroupEditing() {
    this.setState({isEditingGroup: false});
  }

  renameSelectedGroup(name) {
    const oldName = this.state.selectedGroup;

    if (oldName && oldName !== name) {
      this.grContacts[name] = [...(this.grContacts[oldName] || [])];
      delete this.grContacts[oldName];

      let groups = [...this.state.groups];
      groups[groups.indexOf(oldName)] = name;

      this.setState({groups, selectedGroup: name});
    }
  }

  deleteSelectedGroup() {
    const name = this.state.selectedGroup;

    if (name) {
      delete this.grContacts[name];

      let groups = [...this.state.groups];
      groups.splice(groups.indexOf(name), 1);

      this.setState({groups, selectedGroup: undefined});
    }
  }

  addNewGroup() {
    const name = 'UNTITLED ' + uid();

    this.setState({
      groups: [...this.state.groups, name],
      selectedGroup: name,
      isEditingGroup: true,
    })
  }

  get contactPanelControls() {
    if (this.state.isEditingGroup) {
      return [];
    } else if (this.state.isEditingContacts) {
      return [
        <span className="panel-control right"
              style={{color: 'green'}}
              key={uid()}
              onClick={_ => {
                this.grContacts[this.state.selectedGroup] = [...this.state.selectedContacts];
                this.cancelContactsEditing();
              }}
        >
          {constants.CHECK_MARKER}
        </span>,
        <span className="panel-control right"
              key={uid()}
              style={{color: 'red'}}
              onClick={_ => this.cancelContactsEditing()}
        >
          {constants.DISCARD_MARKER}
        </span>,
      ]
    } else if (this.state.selectedGroup) {
      return [
        <span className="panel-control right"
              key={uid()}
              onClick={_ => this.setState({
                isEditingContacts: true,
                selectedContacts: [...(this.grContacts[this.state.selectedGroup] || [])]
              })}>
          {constants.PENCIL}
        </span>
      ];
    }

    return [];
  }

  get groupPanelControls() {
    let that = this;

    if (this.state.isEditingGroup) {
      return [
        <span className="panel-control right"
              style={{color: 'green'}}
              key={uid()}
              onClick={_ => {
                this.renameSelectedGroup(that.groupBeingEdited.contentEl.innerText);
                this.cancelGroupEditing();
              }}
        >
          {constants.CHECK_MARKER}
        </span>,
        <span className="panel-control right"
              style={{color: 'red'}}
              key={uid()}
              onClick={_ => this.cancelGroupEditing()}
        >
          {constants.DISCARD_MARKER}
        </span>,
      ]
    }

    let controls = [
      <span className="panel-control right"
            key={uid()}
            style={{marginTop: '-3px'}}
            onClick={_ => this.addNewGroup()}
      >
        {constants.PLUS}
      </span>,
    ];

    if (this.state.selectedGroup) {
      controls = [
        ...controls,
        <span className="panel-control right"
              key={uid()}
              onClick={_ => this.setState({isEditingGroup: true})}
        >
          {constants.PENCIL}
        </span>,
        <span className="panel-control right"
              key={uid()}
              onClick={_ => this.deleteSelectedGroup()}
        >
          {constants.RECYCLE}
        </span>,
      ];
    }

    return controls;
  }

  render() {
    const panelStyle = {maxHeight: '50%'};

    return (
      <div>
        <PanelContainer>
          <Panel title='Groups' style={panelStyle} key="Groups" controls={this.groupPanelControls}>
            {this.renderGroups()}
          </Panel>,
          <Panel title='Contacts' style={panelStyle} key="Contacts" controls={this.contactPanelControls}>
            { this.state.isEditingContacts ?
              this.renderContacts4Editing() :
              this.renderContacts()
            }
          </Panel>
        </PanelContainer>
        {this.renderMessageWindows()}
      </div>
    );
  }
}
