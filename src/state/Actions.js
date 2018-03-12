import Dispatcher from "./Dispatcher";
import ActionTypes from "./ActionTypes";

export default {
    setPlayerLooks(looks) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_PLAYER_LOOKS,
            looks,
        });        
    },

    setPlayerName(prefix, surname, name) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_PLAYER_NAME,
            prefix,
            surname,
            name,
        });    
    },

    setLocationData(json) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_LOCATION_DATA,
            json,
        });  
    },

    changeLocation(location) {
        Dispatcher.dispatch({
            type: ActionTypes.CHANGE_LOCATION,
            location,
        });
    },

    setSceneData(scenes) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_SCENE_DATA,
            scenes,
        });
    },

    setItems(items) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_ITEM_DATA,
            items,
        });
    },

    setContainers(containers) {
        Dispatcher.dispatch({
            type: ActionTypes.SET_CONTAINER_DATA,
            containers,
        });
    },

    exitContainer(container) {
        Dispatcher.dispatch({
            type: ActionTypes.EXIT_CONTAINER,
            container,
        });
    },

    backToGame() {
        Dispatcher.dispatch({
            type: ActionTypes.RETURN_TO_GAME,
        });
    },

    openCharacterPane() {
        Dispatcher.dispatch({
            type: ActionTypes.SHOW_CHARACTER_PANE,
        });
    },

    performAction(action, options) {
        Dispatcher.dispatch({
            type: `USER_ACT_${action}`,
            options,
        });
    }
};