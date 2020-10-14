import { Moment } from "moment"

import { SCREEN_HEIGHT_CHANGED, TIME_LIMIT_UPDATED, PLAYER_ADDED, PLAYER_REMOVED, PLAYERS_REORDERED,
    PLAYER_COLOR_CHANGED, GAME_STARTED, ROUND_FINISHED, TIMER_UPDATED, TIME_OUT, TIME_END_UPDATED,
    PlayerType, AppActionTypes } from '../storeTypes';

export const changeScreenHeight = (screenHeight: number): AppActionTypes => {
    return {
        type: SCREEN_HEIGHT_CHANGED,
        screenHeight,
    }
}

export const updateTimeLimit = (timeLimit: number): AppActionTypes => {
    return {
        type: TIME_LIMIT_UPDATED,
        timeLimit,
    }
}

export const addPlayer = (playerName: string): AppActionTypes => {
    return {
        type: PLAYER_ADDED,
        playerName,
    }
}

export const playerRemoved = (newPlayers: PlayerType[]): AppActionTypes => {
    return {
        type: PLAYER_REMOVED,
        newPlayers,
    }
}

export const playersReordered = (newPlayers: PlayerType[]): AppActionTypes => {
    return {
        type: PLAYERS_REORDERED,
        newPlayers,
    }
}

export const changePlayerColor = (playerId: number, color: string[]): AppActionTypes => {
    return {
        type: PLAYER_COLOR_CHANGED,
        playerId,
        color,
    }
}

export const startGame = (): AppActionTypes => {
    return {
        type: GAME_STARTED,
    }
}

export const finishRound = (): AppActionTypes => {
    return {
        type: ROUND_FINISHED,
    }
}

export const timerUpdated = (): AppActionTypes => {
    return {
        type: TIMER_UPDATED,
    }
}

export const timeOut = (): AppActionTypes => {
    return {
        type: TIME_OUT,
    }
}

export const updateTimeEnd = (timeEnd: Moment): AppActionTypes => {
    return {
        type: TIME_END_UPDATED,
        timeEnd,
    }
}