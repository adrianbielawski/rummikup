export const SCREEN_HEIGHT_CHANGED = 'APP/SCREEN_HEIGHT_CHANGED'
export const TIME_LIMIT_UPDATED = 'MENU/TIME_LIMIT_UPDATED'
export const PLAYER_ADDED = 'MENU/PLAYER_ADDED'
export const PLAYER_REMOVED = 'MENU/PLAYER_REMOVED'
export const PLAYERS_REORDERED = 'MENU/PLAYERS_REORDERED'
export const PLAYER_COLOR_CHANGED = 'MENU/PLAYER_COLOR_CHANGED'
export const GAME_STARTED = 'MENU/GAME_STARTED'

export interface PlayerType {
    playerName: string,
    id: number,
    color: string[],
    score: number,
}

export interface AppState {
    screenHeight: number,
    timeLimit: number,
    players: PlayerType[],
    gameStarted: boolean,
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

interface playerRemoved {
    type: typeof PLAYER_REMOVED,
    newPlayers: PlayerType[],
}

interface playersReordered {
    type: typeof PLAYERS_REORDERED,
    newPlayers: PlayerType[],
}

interface changePlayerColor {
    type: typeof PLAYER_COLOR_CHANGED,
    playerId: number,
    color: string[],
}

interface startGame {
    type: typeof GAME_STARTED,
}

export type AppActionTypes = changeScreenHeight | updateTimeLimit | addPlayer | playerRemoved | playersReordered
    | changePlayerColor | startGame