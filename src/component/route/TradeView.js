import React, { Component } from 'react';

import InventoryPane from '../partial/InventoryPane';

import './tradeview.css';
import Actions from '../../state/Actions';

class TradeView extends Component {
    state = {
      playerInventory: [ ...this.props.player.getInventory() ],
      traderInventory: [ ...this.props.trader.getInventory() ],
      playerPaymentTotal: 0,
    };

    render() {
        return (
          <React.Fragment>
            <div className="trade-view wrapper">
                <div className="panel-view">
                    <InventoryPane 
                      for={ this.state.playerInventory }
                      onClick={this.transferItemToTrader}
                      name={ this.props.player.name }
                      money={ this.props.player.money }
                    />
                    <div className="panel-view__gap"></div>
                    <InventoryPane 
                      for={ this.state.traderInventory }
                      onClick={this.transferItemToPlayer}
                      name={ this.props.trader.name }
                      money={ this.props.trader.money }
                    />
                </div> 
            </div>
            <div className="trade-footer">
              <button onClick={ this.completeTrade }>Confirm</button> 
              <button onClick={ () => Actions.exitContainer(this.props.trader) }>Cancel</button>  
            </div>
          </React.Fragment>
        )  
    }

    transferItemToPlayer = (item, index) => {
      console.log(item)
      if (this.props.type !== 'inv') {
          if (this.props.player.money > (this.state.playerPaymentTotal + item.value)) {
              return;
          }
      }

      const tInv = [...this.state.traderInventory];
      tInv.splice(index, 1);

      // TODO: Add trader biased
      this.setState({
        ...this.state,
        playerPaymentTotal: this.state.playerPaymentTotal += item.value,
        playerInventory: [...this.state.playerInventory, item],
        traderInventory: tInv,
      });
  }


    transferItemToTrader = (item, index) => {
        if (this.props.type !== 'inv') {
            if (-this.props.trader.money < (this.state.playerPaymentTotal - item.value)) {
                return;
            }
        }

        const pInv = [ ...this.state.playerInventory ];
        pInv.splice(index, 1);

        // TODO: Add trader biased
        this.setState({
            ...this.state,
            playerPaymentTotal: this.state.playerPaymentTotal -= item.value,
            playerInventory: pInv,
            traderInventory: [ ...this.state.traderInventory, item ],
        });
    }

    update = (tradeInterface) => {
      this.setState({
        ...this.state,
        tradeInterface,
      });
    }

    completeTrade = () => {
      if (this.monetary) {
          this.props.player.money -= this.playerPaymentTotal;
          this.props.trader.money += this.playerPaymentTotal;
      }

      this.props.player.inventory = [ ...this.state.playerInventory.map(it => it.id) ];
      this.props.trader.inventory = [ ...this.state.traderInventory.map(it => it.id) ];
      if (this.props.type === 'inv') {
        Actions.exitContainer(this.props.trader);
        return;
      }

    }
  }

export default TradeView;