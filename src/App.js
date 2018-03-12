import React, { Component, Fragment } from 'react';
import { 
  BrowserRouter as Router,
  Redirect,
  Route, 
  Switch 
} from 'react-router-dom'
import { Container } from 'flux/utils';

import Map from './component/partial/Map';
import Character from './component/route/Character';
import Menu from './component/route/Menu';
import CharacterCreator from './component/route/CharacterCreator';
import MainGame from './component/route/MainGame';
import TradeView from './component/route/TradeView';

import GameStore from './state/GameState/GameStore';
import CacheStore from './state/CacheState/CacheStore';

class App extends Component {
  render() {
    return (
      <Fragment>
        { this.displayView() }
      </Fragment>
    );
  }


  displayView = () => {
    if (this.state.cache.forceView) {
      switch (this.state.cache.forceView.view) {
        case 'trade':
          return (
              <TradeView 
                type={ this.state.cache.forceView.type }
                player={ this.state.gameState.player }
                trader={ this.state.cache.forceView.trader }
              />
          );
          case 'character':
            return (<Character state={this.state.gameState} cache={this.state.cache} />);
         default:
      }
    }

    // We don't have a special view to display, just display the normal view
    return (
      <div className="wrapper">
        <aside data-role="details">
          <div className="aside__contents">
            Aside
          </div>
          <Map location={ this.state.gameState.location } canMove={ this.state.gameState.scene.canMove } />
        </aside>
        <main role="main">
          
          <Router>
            <Switch>
              <Route exact path="/" component={Menu} />
              <Route path="/new" component={CharacterCreator} />
              {/* <Route path="/load" component={Load} /> */}
              <Route path="/main" render={(routeProps) => (
                <MainGame state={this.state.gameState} cache={this.state.cache} />
              )} />
            </Switch>
          </Router>
        </main>

        <aside data-role="details">
        </aside>
      </div>
    );
  }

  static getStores() { 
    return [
      GameStore,
      CacheStore,
    ]
  } 
  
  static calculateState(prevState) { 
    return {
      gameState: GameStore.getState(),
      cache: CacheStore.getState(),
    }
  }
}

export default Container.create(App);
