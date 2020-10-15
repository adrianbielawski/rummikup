import { AppState, AppActionTypes } from '../storeTypes'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { COLORS } from 'constants/constants'

const initialState: AppState = {
    screenHeight: window.innerHeight,
    timeLimit: 60,
    timeLeft: 60,
    timeEnd: moment(),
    players: [
        {
            playerName: 'sss',
            id: 0,
            color: Object.entries(COLORS)[0],
            score: 0,
        },
        {
            playerName: 'ddd',
            id: 1,
            color: Object.entries(COLORS)[1],
            score: 0,
        }
    ],
    currentPlayer: 0,
    gameStarted: false,
    roundFinished: false,
    gameFinished : false,
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

        case 'GAME/ROUND_FINISHED':
            newState.roundFinished = true
            return newState

        case 'GAME/TIMER_UPDATED':
            let timeLeft = moment(newState.timeEnd).diff(moment(), 'seconds', true)
            timeLeft = Math.ceil(Math.max(0, timeLeft))
            newState.timeLeft = timeLeft
            return newState

        case 'GAME/PLAYER_SWITCHED':
        case 'GAME/TIME_OUT':
            let nextPlayer = newState.currentPlayer + 1

            if (nextPlayer === newState.players.length) {
                nextPlayer = 0;
            }

            newState.currentPlayer = nextPlayer
            newState.timeEnd = moment().add(newState.timeLimit, 'seconds')
            return newState

        case 'GAME/TIME_END_UPDATED':
            newState.timeEnd = action.timeEnd
            return newState

        case 'GAME/NEXT_ROUND':
            newState.players = action.subPlayers
            let currentPlayer = newState.currentPlayer + 1
            if (currentPlayer >= newState.players.length) {
                currentPlayer = 0
            }
            newState.currentPlayer = currentPlayer
            newState.roundFinished = false
            return newState

        case 'GAME/GAME_FINISHED':
            newState.players = action.subPlayers
            newState.gameFinished = true
            return newState

        default:
            return newState
    }
}

export default appReducer