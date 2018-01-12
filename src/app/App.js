import React from "react";
import {render} from "react-dom";
import PropTypes from "prop-types";
import Client from "./Client.js";
import ConfigurationTree from "./components/ConfigurationTree";
import ConfigurationEditor from "./components/ConfigurationEditor";


class App extends React.Component {
  constructor(props){
    super(props);

    this.selectConfiguration = this.selectConfiguration.bind(this);
    this.changeConfiguration = this.changeConfiguration.bind(this);
    this.saveConfiguration = this.saveConfiguration.bind(this);
    
    this.client = new Client();
    this.state = {tree:"", selectedContent:"", selectedPath:"", dirty:false};
    this.client.listResources().then(
      result => {
        let newState = {tree:result, selectedContent:"please select a configuration file from the left side"};
        this.setState(newState);
      },
      reject => {
        this.setState({"error":true, msg : reject});
      }
    );
  }

  selectConfiguration(path){
    // todo: check for dirty flag before leaving
    if (this.state.dirty){
      if (! confirm("You have unsaved changes that will be lost. Do you want to leave the editor?")){
        return;
      }
    }
    this.client.getResource(path).then(
      result => {
        let newState = {tree:this.state.tree, selectedContent:result, selectedPath: path, dirty:false};
        this.setState(newState);
      }      
    );
  }

  changeConfiguration(content){
    let newState = {tree:this.state.tree, selectedContent:content, selectedPath: this.state.selectedPath, dirty:true};
    this.setState(newState);
  }

  saveConfiguration(path){
    this.client.writeResource(this.state.selectedContent, path).then(
      result => {
        let newState = {tree:this.state.tree, selectedContent:result, selectedPath: path, dirty:false};
        this.setState(newState);
      }            
    );
  }
  

  render() {
    let navContent = "loading ...";
    let editorContent = "";
    if (this.state.tree && this.state.tree.ifcVersionList) {
      navContent = <ConfigurationTree data={this.state.tree} configurationSelected={this.selectConfiguration}></ConfigurationTree>;
      editorContent = <ConfigurationEditor content={this.state.selectedContent} path={this.state.selectedPath} 
      configurationChanged={this.changeConfiguration} configurationSaved={this.saveConfiguration} dirty={this.state.dirty}></ConfigurationEditor>;
    } else if (this.state && this.state.error) {
      navContent = this.state.msg;
    }
    
    return (
      <div style={{ width: "100%" }}>
        <div style={{ float: "left", width: "30%" }}>
          {navContent}
        </div>
        <div style={{ float: "right", width: "70%" }}>
        <br/>
          {editorContent}
        </div>
      </div>
    );
  }

}

render(<App/>, window.document.getElementById("react-container"));
