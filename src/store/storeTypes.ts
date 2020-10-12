export const SCREEN_HEIGHT_CHANGED = 'APP/SCREEN_HEIGHT_CHANGED';
export const TIME_LIMIT_UPDATED = 'MENU/TIME_LIMIT_UPDATED';

export interface AppState {
    screenHeight: number,
    timeLimit: number,
} 

interface changeScreenHeight {
    type: typeof SCREEN_HEIGHT_CHANGED,
    screenHeight: number,
}

interface updateTimeLimit {
    type: typeof TIME_LIMIT_UPDATED,
    timeLimit: number,
}

export type AppActionTypes = changeScreenHeight | updateTimeLimit;