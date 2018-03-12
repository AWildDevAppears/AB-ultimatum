import React, { Component, Fragment } from 'react';


import Actions from '../../state/Actions';
import InventoryPane from '../partial/InventoryPane';

import './character.css';

class Character extends Component {
    state = {
      itemToDisplay: {},
      itemButtons: [],
      inventory: this.props.state.player.getInventory(),
      equipment: this.props.state.player.equipment,
    }

    render() {
      return (
        <Fragment>
            <div className="trade-view wrapper">
                <div className="panel-view">
                    <InventoryPane 
                      for={ this.state.inventory }
                      onClick={ this.displayItemInSidePanel }
                      name={ this.props.state.player.name }
                      money={ this.props.state.player.money }
                    />
                    <div className="panel-view__gap"></div>
                    <div className="panel">
                      <div className="panel__side-heading">----</div>
                      <div className="panel__body panel__body--no-scroll">
                          <div className="character__equipment">
                            <p>Head: { this.state.equipment.head || 'none' }</p>
                            <p>Body: { this.state.equipment.body || 'none' }</p>
                            <p>Legs: { this.state.equipment.legs || 'none' }</p>
                            <p>Boots: { this.state.equipment.boots || 'none' }</p>
                            <p>Gloves: { this.state.equipment.gloves || 'none' }</p>
                            <p>Weapon: { this.state.equipment.weapon || 'none' }</p>

                          </div>

                          <div className="panel__footer">
                            <h2>{ this.state.itemToDisplay.name }</h2>
                            <p>{ this.state.itemToDisplay.description }</p>

                            { this.state.itemButtons }
                          </div>
                      </div>
                    </div>
                </div> 
            </div>
            <div className="trade-footer">
              <button onClick={ this.backToGame }>Back</button> 
            </div>
        </Fragment>
      );
    }

    backToGame = () => {
      Actions.backToGame();
    }

    discardItem = (index) => {
      this.props.state.player.inventory.splice(index, 1);

      this.setState({
        ...this.state,
        inventory: this.props.state.player.getInventory(),
        itemToDisplay: {},
        itemButtons: [],
      })
    }

    equipItem = (item, index) => {
      this.props.state.player.equipment[item.role] = item.id;

      this.setState({
        ...this.state,
        equipment: this.props.state.player.equipment,
      });

      this.discardItem(index);
    }

    displayItemInSidePanel = (itemToDisplay, index) => {
      let itemButtons = [
        (<button onClick={() => this.discardItem(index)}>Discard</button>)
      ];

      switch (itemToDisplay.role) {
        case 'weapon':
        case 'head':
        case 'boots':
        case 'body':
        case 'legs':
        case 'gloves':
          itemButtons.push(
            (<button onClick={() => this.equipItem(itemToDisplay, index) }>Equip</button>)
          ); 
        default:
        break;
      }
 
      this.setState({
        ...this.state,
        itemToDisplay,
        itemButtons,
      });
    }
  }

export default Character;
