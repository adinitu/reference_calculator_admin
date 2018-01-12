import React from 'react';
import PropTypes from "prop-types";

class ConfigurationEditor extends React.Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.configurationChanged(event.target.value);
  }

  handleSubmit(event) {
    this.props.configurationSaved(this.props.path);
    event.preventDefault();
  }

  render(){
    let saveLabel = "Save";
    let pathLabel = this.props.path;
    if (this.props.dirty) {
      pathLabel = pathLabel + " *";
    } 
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value={saveLabel} />
          <br/>
          <h5>{pathLabel}</h5>
          <p/>
          <textarea value={this.props.content} onChange={this.handleChange} style={{ float: "left", width: "95%", height: "90vw"}}/>
        </form>
      </div>      
    );
  }
}
ConfigurationEditor.propTypes = {
  content:PropTypes.string,
  path:PropTypes.string,
  dirty:PropTypes.bool
};

export default ConfigurationEditor;