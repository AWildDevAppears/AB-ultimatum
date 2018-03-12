import { ReduceStore } from 'flux/utils';

import ActionTypes from '../ActionTypes'

import Dispatcher from '../Dispatcher';

import Player from '../../model/Player';
import Actions from '../Actions';

const TIMEFRAMES = {
    DAWN: 'Dawn',
    MORNING: 'Morning',
    AFTERNOON: 'Afternoon',
    DUSK: 'Dusk',
    NIGHT: 'Night',
}

class GameStore extends ReduceStore {
    locations = {};
    scenes = {};
    items = {};
    containers = {};

    state = {};

    constructor() {
        super(Dispatcher);
        fetch('/data/location.json')
            .then((res) => res.json())
            .then((json) => {
                Actions.setLocationData(json);
                return fetch('/data/scenes.json')
            })       
            .then((res) => res.json())
            .then((json) => {
                Actions.setSceneData(json);
            });
    }

    reduce(state, action) {
        let s = {
            ...state,
            timeframe: this.getTimeframe(),
        };

        switch (action.type) {
            case ActionTypes.SET_PLAYER_LOOKS:
                s.player.setPlayerLooks(action.looks);    
            break;
            case ActionTypes.SET_PLAYER_NAME:
                s.player.setPlayerName(action.prefix, action.surname, action.name);
            break;
            case ActionTypes.CHANGE_LOCATION:
                s.location = this.locations[action.location.id];
                s.scene = this.scenes[this.getSceneKeyForLocation(s.location.scenes, s.timeframe)];
                if (action.travel) {
                    s.time = this.getUpdatedClock(s.time, action.location.travel);
                }
                break;
            case ActionTypes.SET_LOCATION_DATA:
                this.locations = action.json;
                s.location = this.locations['my_house_front_door'];
                break;
                case ActionTypes.SET_SCENE_DATA:
                this.scenes = action.scenes;
                s.scene = this.scenes[this.getSceneKeyForLocation(s.location.scenes, s.timeframe)];
                break;
            case ActionTypes.SET_ITEM_DATA:
                this.items = action.items;
                break;
            case ActionTypes.SET_CONTAINER_DATA:
                this.containers = action.containers;
                break;
            case ActionTypes.USER_ACT_NEXT_SCENE:
                s.scene = this.scenes[action.options.scene];
                if (action.options.time) {
                    s.time = this.getUpdatedClock(s.time, action.options.time);
                }
                break;
            default:

        }

        return s;
    }

    getInitialState() {
        return {
            player: new Player(),
            location: {},
            scene: {},
            time: {
                d: 1,
                h: 17,
                m: 45,
            },
            timeframe: TIMEFRAMES.AFTERNOON,
            forceView: {},
        }
    }

    getTimeframe() {
        const hours = this.getState().time.h

        if (hours >= 4 && hours < 6) {
            return TIMEFRAMES.DAWN;
        }
        if (hours >= 6 && hours < 12) {
            return TIMEFRAMES.MORNING;
        }
        if (hours >= 12 && hours < 20) {
            return TIMEFRAMES.AFTERNOON;
        }
        if (hours >= 20 && hours < 22) {
            return TIMEFRAMES.DUSK;
        }
        if ((hours >= 22 && hours <= 24) || (hours >= 0 && hours < 4)) {
            return TIMEFRAMES.NIGHT;
        }
    }

    getUpdatedClock(clock, minutes) {
        const DAY = (24 * 60);
        const HOUR = 60;

        let longtime = ((clock.d * DAY) + (clock.h * HOUR) + clock.m) + minutes;

        const days = Math.floor(longtime / DAY);
        longtime -= days * DAY;
        const hours = Math.floor(longtime / HOUR);
        longtime -= hours * HOUR;
        
        clock.d = days;
        clock.h = hours;
        clock.m = longtime;

        return clock;
    }

    getSceneKeyForLocation(scenes, timeframe) {
        const timeScenes = scenes[timeframe];

        if (timeScenes) {
            return scenes[timeframe][Math.floor(Math.random() * timeScenes.length)];
        }

        return scenes.random[Math.floor(Math.random() * scenes.random.length)];
    }
}

export default new GameStore();