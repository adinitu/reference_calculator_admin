import React from 'react';
import PropTypes from 'prop-types';

class TreeView extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: props.defaultCollapsed
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(...args) {
    this.setState({ collapsed: !this.state.collapsed });
    //console.log("item clicked, data: " + this.props.data);
    if (this.props.onClick) {
      this.props.onClick(this.props.data);
    }
  }

  render() {
    const {
      collapsed = this.state.collapsed,
      className = '',
      itemClassName = '',
      treeViewClassName = '',
      childrenClassName = '',
      nodeLabel,
      children,
      defaultCollapsed,
      ...rest
    } = this.props;

    let arrowClassName = 'tree-view_arrow';
    let containerClassName = 'tree-view_children';
    if (collapsed) {
      arrowClassName += ' tree-view_arrow-collapsed';
      containerClassName += ' tree-view_children-collapsed';
    }

    let arrow = (
      <div
        {...rest}
        className={className + ' ' + arrowClassName}
              />
    );

    if (itemClassName == 'info'){
      arrow = "";
    }
    return (
      <div className={'tree-view ' + treeViewClassName}>
        <div className={'tree-view_item ' + itemClassName} onClick={this.handleClick}>
          {arrow}
          {nodeLabel}
        </div>
        <div className={containerClassName + ' ' + childrenClassName}>
          {collapsed ? null : children}
        </div>
      </div>
    );
  }
}
TreeView.propTypes = {
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  nodeLabel: PropTypes.node.isRequired,
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  childrenClassName: PropTypes.string,
  treeViewClassName: PropTypes.string,
  data: PropTypes.string
};

export default TreeView;