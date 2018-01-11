import React from 'react';
import PropTypes from "prop-types";

class ConfigurationEditor extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
      <button>Save</button>
      <br/>
      <textarea value = {this.props.content} style={{ float: "left", width: "95%", height: "90vw"}}/>
      </div>
    );
  }
}
ConfigurationEditor.propTypes = {
  content:PropTypes.string
};

export default ConfigurationEditor;