import React from "react";
import {render} from "react-dom";
import PropTypes from "prop-types";
import Client from "./Client.js";
import ConfigurationTree from "./components/ConfigurationTree";
import ConfigurationEditor from "./components/ConfigurationEditor";


class App extends React.Component {
  constructor(props){
    super(props);

    this.configurationSelected = this.configurationSelected.bind(this);
    
    this.client = new Client();
    this.state = {tree:"", selectedContent:""};
    this.client.listResources().then(
      result => {
        let newState = {tree:result, selectedContent:"please select a configuration file"};
        this.setState(newState);
      },
      reject => {
        this.setState({"error":true, msg : reject});
      }
    );
  }

  render() {
    let navContent = "loading ...";
    let editorContent = "";
    if (this.state.tree && this.state.tree.ifcVersionList) {
      navContent = <ConfigurationTree data={this.state.tree} configurationSelected={this.configurationSelected}></ConfigurationTree>;
      editorContent = <ConfigurationEditor content={this.state.selectedContent}></ConfigurationEditor>;
    } else if (this.state && this.state.error) {
      navContent = this.state.msg;
    }
    
    return (
      <div style={{ width: "100%" }}>
        <div style={{ float: "left", width: "30%" }}>
          <h2>Available configurations</h2>
          <br/>
          {navContent}
        </div>
        <div style={{ float: "right", width: "70%" }}>
        <h2>Editor</h2>
        <br/>
          {editorContent}
        </div>
      </div>
    );
  }

  configurationSelected(path){
    this.client.getResource(path).then(
      result => {
        console.log("Successfully reading configuration:" + path);
        let newState = {tree:this.state.tree, selectedContent:result};
        this.setState(newState);
      }      
    );
  }

}

render(<App/>, window.document.getElementById("react-container"));
