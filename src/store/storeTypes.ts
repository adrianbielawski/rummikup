import { Object } from "lodash";

export const SCREEN_HEIGHT_CHANGED = 'APP/SCREEN_HEIGHT_CHANGED'
export const TIME_LIMIT_UPDATED = 'MENU/TIME_LIMIT_UPDATED'
export const PLAYER_ADDED = 'MENU/PLAYER_ADDED'

interface Player {
    playerName: string,
    id: number,
    color: string[],
    score: number,
}

export interface AppState {
    screenHeight: number,
    timeLimit: number,
    players: Player[]
}

interface changeScreenHeight {
    type: typeof SCREEN_HEIGHT_CHANGED,
    screenHeight: number,
}

interface updateTimeLimit {
    type: typeof TIME_LIMIT_UPDATED,
    timeLimit: number,
}

interface addPlayer {
    type: typeof PLAYER_ADDED,
    playerName: string,
}

export type AppActionTypes = changeScreenHeight | updateTimeLimit | addPlayer