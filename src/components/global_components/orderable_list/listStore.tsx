import React from 'react'
import { cloneDeep } from 'lodash'

export interface Coords { top: number, left: number }
export interface StartGrabCoords { x: number, y: number }

export type HandleDrop = (newPosition: number) => void
export type HandleRemove = (index: number) => void

type Action =
    | { type: 'DEVICE_INSPECTED', isTouchDevice: boolean }
    | { type: 'ELEMENT_GRABBED', 
        index: number | null,
        elementW: number | null,
        elementH: number | null,
        startCoords: Coords,
        startGrabCoords: StartGrabCoords,}
    | { type: 'ENABLE_TRANSITION' }
    | { type: 'ELEMENT_MOVED',
        coords: Coords,
        distance: number | null,
        scrollStep: number | null }
    | { type: 'MOUSE_LEFT' }
    | { type: 'CLEAR_STATE' }

type InitialState<T> = {
    isTouchDevice: boolean | null,
    element: React.RefObject<HTMLUListElement> | null,
    items: T[],
    grabbedElement: {
        index: number | null,
        width: number | null,
        height: number | null,
        startCoords: Coords,
        coords: Coords,
        startGrabCoords: StartGrabCoords,
    },
    distance: number | null,
    scrollStep: number | null,
    initialTopOffset: number,
    transition: boolean,
}

type ListContextType<T> = {
    state: InitialState<T>,
    dispatch: React.Dispatch<Action>,
    handleDrop: HandleDrop,
    handleRemove: HandleRemove,
}

export const initialState: InitialState<any> = {
    isTouchDevice: null,
    element: null,
    items: [],
    grabbedElement: {
        index: null,
        width: null,
        height: null,
        startCoords: { top: 0, left: 0 },
        coords: { top: 0, left: 0 },
        startGrabCoords: { x: 0, y: 0 },
    },
    distance: null,
    scrollStep: null,
    initialTopOffset: 0,
    transition: false,
}

export const reducer = (state: InitialState<any>, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'DEVICE_INSPECTED':
            newState.isTouchDevice = action.isTouchDevice
            return newState
        case 'ELEMENT_GRABBED':
            newState.grabbedElement = {
                index: action.index,
                width: action.elementW,
                height: action.elementH,
                startCoords: action.startCoords,
                coords: action.startCoords,
                startGrabCoords: action.startGrabCoords,
            }
            newState.distance = 0
            newState.initialTopOffset = window.pageYOffset
            return newState
        case 'ENABLE_TRANSITION':
            newState.transition = true
            return newState
        case 'ELEMENT_MOVED':
            newState.grabbedElement.coords = action.coords
            newState.distance = action.distance
            newState.scrollStep = action.scrollStep
            return newState
        case 'MOUSE_LEFT':
        case 'CLEAR_STATE':
            newState = cloneDeep(initialState)
            newState.isTouchDevice = state.isTouchDevice
            return newState
        default:
            throw new Error()
    }
}

const initialContext = {
    state: initialState,
    dispatch: () => {},
    handleDrop: () => {},
    handleRemove: () => {},
}

export const ListContext = React.createContext<ListContextType<any>>(initialContext)