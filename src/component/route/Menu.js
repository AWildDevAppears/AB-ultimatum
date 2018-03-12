import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'

class Menu extends Component {
    render() {
      return (
        <Fragment>
            <h1>Title goes here</h1>

            <h2><Link to="/new">New Game</Link></h2>
            <h2><Link to="/continue">Continue</Link></h2>
            <h2><Link to="/load">Load</Link></h2>
        </Fragment>
      );
    }
  }

export default Menu;