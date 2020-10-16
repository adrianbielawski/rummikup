import { Moment } from "moment"

export const SCREEN_HEIGHT_CHANGED = 'APP/SCREEN_HEIGHT_CHANGED'
export const TIME_LIMIT_UPDATED = 'MENU/TIME_LIMIT_UPDATED'
export const PLAYER_ADDED = 'MENU/PLAYER_ADDED'
export const PLAYER_REMOVED = 'MENU/PLAYER_REMOVED'
export const PLAYERS_REORDERED = 'MENU/PLAYERS_REORDERED'
export const PLAYER_COLOR_CHANGED = 'MENU/PLAYER_COLOR_CHANGED'
export const GAME_CREATED = 'MENU/GAME_CREATED'
export const GAME_STARTED = 'GAME/GAME_STARTED'
export const ROUND_FINISHED = 'GAME/ROUND_FINISHED'
export const TIMER_UPDATED = 'GAME/TIMER_UPDATED'
export const TIME_END_UPDATED = 'GAME/TIME_END_UPDATED'
export const PLAYER_SWITCHED = 'GAME/PLAYER_SWITCHED'
export const NEXT_ROUND = 'GAME/NEXT_ROUND'
export const GAME_FINISHED = 'GAME/GAME_FINISHED'
export const GAME_CLOSED = 'GAME/GAME_CLOSED'

export type NextRound = (players: PlayerType[], points: Points) => void

export interface PlayerType {
    playerName: string,
    id: number,
    color: string[],
    score: number,
}

export interface Points {
    [key: number]: number
}

export interface AppState {
    screenHeight: number,
    timeLimit: number,
    timeLeft: number,
    timeEnd: Moment,
    players: PlayerType[],
    currentPlayer: number,
    roundCount: number,
    gameCreated: boolean,
    gameStarted: boolean,
    roundFinished: boolean,
    gameFinished: boolean,
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

interface createGame {
    type: typeof GAME_CREATED,
}

interface startGame {
    type: typeof GAME_STARTED,
}

interface finishRound {
    type: typeof ROUND_FINISHED,
}

interface timerUpdated {
    type: typeof TIMER_UPDATED,
}

interface updateTimeEnd {
    type: typeof TIME_END_UPDATED,
    timeEnd: Moment,
}

interface playerSwitched {
    type: typeof PLAYER_SWITCHED,
}

interface handleNextRound {
    type: typeof NEXT_ROUND,
    subPlayers: PlayerType[],
}

interface handleGameFinished {
    type: typeof GAME_FINISHED,
    subPlayers: PlayerType[],
}

interface exitGame {
    type: typeof GAME_CLOSED,
}

export type AppActionTypes = changeScreenHeight | updateTimeLimit | addPlayer | playerRemoved | playersReordered
    | changePlayerColor | createGame | startGame | finishRound | timerUpdated | updateTimeEnd | playerSwitched
    | handleNextRound | handleGameFinished | exitGame