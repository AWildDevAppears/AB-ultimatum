import React, { Component, Fragment } from 'react';
import Actions from '../../state/Actions';

class MainGame extends Component {
    render() {
      return (
        <Fragment>
            <p>
              Day { this.props.state.time.d } - { this.props.state.time.h }:{ this.props.state.time.m } - { this.props.state.timeframe }
            </p>
            <h2>{ this.props.state.location.name }</h2>

            <p>{ this.outputScene() }</p>

            <p>{ this.outputActions() }</p>
        </Fragment>
      );
    }

    outputScene = () => {
      if (this.props.state.scene && this.props.state.scene.body) {
        return this.props.state.scene.body.map((para, index) => <span key={index}>{ para }</span>);
      } else {
        return '';
      }
    }

    outputActions = () => {
      if (this.props.state.scene && this.props.state.scene.actions) {
        return this.props.state.scene.actions.map((action, index) => <button onClick={() => this.performAction(action.action, action.options)} key={index}>{ action.text }</button>);
      } else {
        return '';
      }
    }

    performAction = (action, options) => {
      Actions.performAction(action, options);
    }
  }

export default MainGame;