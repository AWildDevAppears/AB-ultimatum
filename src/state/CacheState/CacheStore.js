import { ReduceStore } from 'flux/utils';

import ActionTypes from '../ActionTypes'

import Dispatcher from '../Dispatcher';

import Actions from '../Actions';
import { Container } from '../../model/Container';

const TIMEFRAMES = {
    DAWN: 'Dawn',
    MORNING: 'Morning',
    AFTERNOON: 'Afternoon',
    DUSK: 'Dusk',
    NIGHT: 'Night',
}

export let ItemList = {};
export let ContainerList = {};

class CacheStore extends ReduceStore {
    constructor() {
        super(Dispatcher);
        fetch('/data/item.json')
            .then((res) => res.json())
            .then((json) => {
                Actions.setItems(json);

                return fetch('/data/container.json')
            })
            .then((res) => res.json())
            .then((json) => {
                Actions.setContainers(json);
            });
    }

    reduce(state, action) {
        let s = {
            ...state,
        };

        switch (action.type) {
            case ActionTypes.SET_ITEM_DATA:
                ItemList = action.items;
                break;
            case ActionTypes.SET_CONTAINER_DATA:
                ContainerList = action.containers;
                break;
                case ActionTypes.USER_ACT_LOOT:
                s.forceView = {
                    view: 'trade',
                    type: 'inv',
                    trader: new Container(action.options.containerId, ContainerList[action.options.containerId]),
                };
                break;
                case ActionTypes.SHOW_CHARACTER_PANE:
                s.forceView = {
                    view: 'character',
                };
                break;
                case ActionTypes.EXIT_CONTAINER:
                s.forceView = {};
                ContainerList[action.container.id] = action.container.asData()
                break;
                case ActionTypes.RETURN_TO_GAME:
                s.forceView = {};
            default:

        }

        return s;
    }

    getInitialState() {
        return {
            forceView: {},
        };
    }

}

export default new CacheStore();