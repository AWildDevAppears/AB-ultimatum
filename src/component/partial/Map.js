import React, { Component } from 'react';

import './map.css';
import Actions from '../../state/Actions';

const KEYBINDINGS = {
  GO_NORTH: 'W',
  GO_EAST: 'D',
  GO_SOUTH: 'S',
  GO_WEST: 'A',
};

class Map extends Component {
  render() {
    if (!this.props.canMove) {
      return (
        <footer>
          <div className="map">
          </div>
        </footer>
      )
    }

    return (
      <footer>
        <div className="map">
            <button onClick={ this.onKeyPress } value="Q">
              <span>Q</span>
              <div></div>
            </button>
            <button onClick={ this.onKeyPress} value="W">
              <span>W</span>
              <div>North</div>
            </button>
            <button onClick={ this.onKeyPress } value="E">
              <span>E</span>
              <div></div>
            </button>

            <button onClick={ this.onKeyPress } value="A">
              <span>A</span>
              <div>West</div>
            </button>
            <button onClick={ this.onKeyPress } value="S">
              <span>S</span>
              <div>South</div>
            </button>
            <button onClick={ this.onKeyPress } value="D">
              <span>D</span>
              <div>East</div>
            </button>

            <button onClick={ this.showCharacterPanel }>
              <span>Z</span>
              <div>Char</div>
            </button>
            <button onClick={ this.showInventory } value="X">
              <span>X</span>
              <div>Inv</div>
            </button>
            <button onClick={ this.showOptions } value="C">
              <span>C</span>
              <div>Opt</div>
            </button>
        </div>
      </footer>
    );
  }

  onKeyPress = (e) => {
    switch (e.target.value) {
      case KEYBINDINGS.GO_NORTH:
        if (this.props.canMove && this.props.location.toNorth) {
          Actions.changeLocation(this.props.location.toNorth);
        }
      break;
      case KEYBINDINGS.GO_SOUTH:
        if (this.props.canMove && this.props.location.toSouth) {
          Actions.changeLocation(this.props.location.toSouth);
        }
      break;
      case KEYBINDINGS.GO_WEST:
      if (this.props.canMove && this.props.location.toWest) {
        Actions.changeLocation(this.props.location.toWest);
      }
    break;
    case KEYBINDINGS.GO_EAST:
    if (this.props.canMove && this.props.location.toEast) {
      Actions.changeLocation(this.props.location.toEast);
    }
  break;
    }
  }

  showCharacterPanel = () => Actions.openCharacterPane();

  showInventory = () => {

  }

  showOptions = () => {

  }
}

export default Map;
