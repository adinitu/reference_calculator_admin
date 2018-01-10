import React from "react";
import {render} from "react-dom";
import PropTypes from "prop-types";
import Client from "./Client.js";
import ConfigurationTree from "./components/ConfigurationTree";


class App extends React.Component {
  constructor(props){
    super(props);

    this.configurationSelected = this.configurationSelected.bind(this);
    
    this.client = new Client();
    this.state = {};
    this.client.listResources().then(
      result => {
        this.setState(result);
      },
      reject => {
        this.setState({"error":true, msg : reject});
      }
    );
  }

  render() {
    let navContent = "loading ...";
    if (this.state && this.state.ifcVersionList) {
      navContent = <ConfigurationTree data={this.state} configurationSelected={this.configurationSelected}></ConfigurationTree>;
    } else if (this.state && this.state.error) {
      navContent = this.state.msg;
    }
    
    return (
      <div style={{ width: "100%" }}>
        <div style={{ float: "left", width: "30%" }}>
          <h2>Navigation</h2>
          <br />
          <div>
            <h6>{navContent}</h6>
          </div>
          <br />
        </div>
        <div style={{ float: "right", width: "70%" }}>
        <h2>Editor</h2>
        <br />
          some text
        <br />
          Goes here<br />
        </div>
      </div>
    );
  }

  configurationSelected(path){
    this.client.getResource(path).then(
      result => {
        console.log("Successfully reading configuration:" + path);
      }      
    );
  }

}

render(<App/>, window.document.getElementById("react-container"));
