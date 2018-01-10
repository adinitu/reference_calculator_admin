import React from 'react';
import TreeView from './react-treeview.js';

class ConfigurationTree extends React.Component {

  constructor(props) {
    super(props);

    this.configurationSelected = this.configurationSelected.bind(this);
  }

  render() {
    return (
      <div>
        {this.props.data.ifcVersionList.map((node, i) => {
          const name = node.name;
          const label = <span className="node">{name}</span>;
          return (
            // render IFC level
            <TreeView key={name + '|' + i} nodeLabel={label} defaultCollapsed={false} data={node.resourcePath}>
              {node.countryList.map(country => {
                const label2 = <span className="node">{country.name}</span>;
                return (
                  // render country level
                  <TreeView nodeLabel={label2} key={country.name} defaultCollapsed={false} data={country.resourcePath}>
                  {country.brandList.map(brand => {
                    const label3 = <span className="node">{brand.name}</span>;
                    return(
                      // render brand level
                      <TreeView nodeLabel={label3} key={brand.name} defaultCollapsed={false} data={brand.resourcePath}>
                        {brand.fileList.map(file => {
                          const label4 = <span className="info">{file.name}</span>;
                          // render file level
                          return(
                            <TreeView nodeLabel={file.name} key={file.name} itemClassName="info" 
                            defaultCollapsed={false} data={file.resourcePath} onClick={this.configurationSelected}>
                            </TreeView>
                          );
                        })}
                      </TreeView>
                    );
                  })}

                  </TreeView>
                );
              })}
            </TreeView>
          );
        })}
      </div>
    );
  }

  configurationSelected(path){
    this.props.configurationSelected(path);
  }
}

export default ConfigurationTree;