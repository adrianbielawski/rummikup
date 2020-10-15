import { cloneDeep } from "lodash";
import { Moment } from "moment"
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from 'store/storeTypes'

import {
    SCREEN_HEIGHT_CHANGED, TIME_LIMIT_UPDATED, PLAYER_ADDED, PLAYER_REMOVED, PLAYERS_REORDERED,
    PLAYER_COLOR_CHANGED, GAME_STARTED, ROUND_FINISHED, TIMER_UPDATED, TIME_OUT, TIME_END_UPDATED,
    PLAYER_SWITCHED, NEXT_ROUND, GAME_FINISHED, PlayerType, Points, AppActionTypes
} from '../storeTypes';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

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

export const switchPlayer = (): AppActionTypes => {
    return {
        type: PLAYER_SWITCHED,
    }
}

const subPoints = (players: PlayerType[], points: Points) => {
    let subPlayers = cloneDeep(players)
    let pointsSum = 0
    let winner = 0

    for (let i = 0; i < subPlayers.length; i++) {
        const p = points[i] || 0
        subPlayers[i].score -= p
        pointsSum += p
        if (p === 0) {
            winner = i
        }
    };

    subPlayers[winner].score += pointsSum
    return subPlayers
};

const handleNextRound = (subPlayers: PlayerType[]): AppActionTypes => {
    return {
        type: NEXT_ROUND,
        subPlayers,
    }
}

export const nextRound = (
    players: PlayerType[],
    points: Points
): AppThunk => dispatch => {
    const subPlayers = subPoints(players, points)
    dispatch(handleNextRound(subPlayers))
}

export const finishGame = (
    players: PlayerType[],
    points: Points
): AppThunk => dispatch => {
    const subPlayers = subPoints(players, points)
    dispatch(handleFinishGame(subPlayers))
}

export const handleFinishGame = (subPlayers: PlayerType[]): AppActionTypes => {
    return {
        type: GAME_FINISHED,
        subPlayers,
    }
}