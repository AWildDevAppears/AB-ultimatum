import React, { Component } from 'react';

class InventoryPane extends Component {
    render() {
      return (
        <div className="panel">
          <div className="panel__heading">{ this.props.name }</div> 
          <div className="panel__side-heading">{ this.props.money }</div>
          <div className="panel__body">
            { this.props.for.map((item, i) => <div 
              className="panel__item" 
              onClick={() => this.props.onClick(item, i) }
              key={ i }
              >
                { item.name }
              </div>)  }
          </div>
        </div>
      );
    }
  }

export default InventoryPane;