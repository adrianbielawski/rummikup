    PLAYER_COLOR_CHANGED, PlayerType, AppActionTypes } from '../storeTypes';

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

export const changePlayerColor = (playerId: number, color: string[]): AppActionTypes => {
    return {
        type: PLAYER_COLOR_CHANGED,
        playerId,
        color,
    }
}