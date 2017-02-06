import React, {Component} from "react";
import PanelContainer from "./chat/panel-container";
import Panel from "./chat/panel";
import ContactItem from "./chat/panel-items/contact";
import GroupItem from "./chat/panel-items/group";
import {uid} from "./util";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panels: [], panelItems: {
        groups: [
          <GroupItem key={uid()} title="Project A" onClick={_ => _}/>,
          <GroupItem key={uid()} title="Group Task" onClick={_ => _}/>,
          <GroupItem key={uid()} title="All Class" onClick={_ => _}/>,
        ],
        contacts: [
          <ContactItem key={uid()} type={ContactItem.TYPE.TEACHER} title="Academic A"/>,
          <ContactItem key={uid()} type={ContactItem.TYPE.TEACHER} title="Doctor B"/>,
          <ContactItem key={uid()} title="Student 1"/>,
          <ContactItem key={uid()} title="Student 2"/>,
        ],
      }
    };
  }

  onGroupClick(title) {

  }

  componentWillMount() {
    const panelStyle = {maxHeight: '50%'};

    this.setState({
      panels: [
        <Panel title='Groups' style={panelStyle} key="Groups">
          {this.state.panelItems.groups}
        </Panel>,
        <Panel title='Contacts' style={panelStyle} key="Contacts">
          {this.state.panelItems.contacts}
        </Panel>
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
