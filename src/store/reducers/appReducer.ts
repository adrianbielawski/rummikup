import { AppState, AppActionTypes } from '../storeTypes'
import { cloneDeep } from 'lodash'
import { COLORS } from '../.././constants/constants'

const initialState: AppState = {
    screenHeight: window.innerHeight,
    timeLimit: 60,
    players: [],
    gameStarted: false,
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
            let newPlayers = cloneDeep(newState.players)
            const id = newPlayers.length
            newPlayers.push({
                playerName: action.playerName,
                id,
                color: Object.entries(COLORS)[id],
                score: 0,
            });
            newState.players = newPlayers
            return newState

        case 'MENU/PLAYERS_REORDERED':
        case 'MENU/PLAYER_REMOVED':
            newState.players = action.newPlayers
            return newState

        case 'MENU/PLAYER_COLOR_CHANGED':
            let players = cloneDeep(newState.players)
            const playerIndex = players.findIndex(player => player.id === action.playerId)
            players[playerIndex].color = action.color
            newState.players = players
            return newState

        case 'MENU/GAME_STARTED':
            newState.gameStarted = true
            return newState

        default:
            return newState
    }
}

export default appReducer