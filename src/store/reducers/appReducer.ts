import { AppState, AppActionTypes } from '../storeTypes'
import { cloneDeep } from 'lodash'
import { COLORS } from '../.././constants/constants';

const initialState: AppState = {
    screenHeight: window.innerHeight,
    timeLimit: 60,
    players: [],
}

const appReducer = (
    state = initialState,
    action: AppActionTypes
): AppState => {
    const newState = cloneDeep(state)
    switch (action.type) {
        case 'APP/SCREEN_HEIGHT_CHANGED':
            newState.screenHeight = action.screenHeight
            return newState

        case 'MENU/TIME_LIMIT_UPDATED':
            newState.timeLimit = action.timeLimit
            return newState

        case 'MENU/PLAYER_ADDED':
            let newPlayers = cloneDeep(newState.players);
            const id = newPlayers.length
            newPlayers.push({
                playerName: action.playerName,
                id,
                color: Object.entries(COLORS)[id],
                score: 0,
            });
            newState.players = newPlayers;
            return newState

        default:
            return newState;
    }
}

export default appReducer