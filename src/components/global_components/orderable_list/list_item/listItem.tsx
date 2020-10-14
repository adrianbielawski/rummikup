import React, { useEffect, useRef, useContext, useReducer } from 'react'
import { cloneDeep } from 'lodash'
import classNames from 'classnames/bind'
import styles from '../orderableList.scss'
//Contexts
import ItemContext from './itemContext'
import ListContext from '../listContext'

type OwnProps<T> = {
    className?: string
    grabbedClassName?: string
    item: T
    index: number
    onRemove: (item: T, newItems: T[]) => void
    onDrop: (newPosition: number, item: T, newItems: T[]) => void
    children: React.ReactNode
}

interface Coords {
    top: number
    left: number
}

type State = {
    elementH: number | null
    coords: Coords
    initialTopOffset: number
    topOffset: number
    itemRemoved: boolean
}

type Action =
    | { type: 'TOP_OFFSET_UPDATED', topOffset: number }
    | { type: 'ITEM_REMOVED' }
    | { type: 'ELEMENT_GRABBED', topStart: number, pageYOffset: number, elementH: number }
    | { type: 'ELEMENT_MOVED', coords: Coords }
    | { type: 'CLEAR_STATE' }

const initialState = {
    elementH: null,
    coords: { top: 0, left: 0 },
    initialTopOffset: 0,
    topOffset: 0,
    itemRemoved: false,
}

const reducer = (state: State, action: Action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'TOP_OFFSET_UPDATED':
            newState.topOffset = action.topOffset
            return newState
        case 'ITEM_REMOVED':
            newState.itemRemoved = true;
            return newState
        case 'ELEMENT_GRABBED':
            newState.coords = { top: action.topStart, left: newState.coords.left }
            newState.initialTopOffset = action.pageYOffset
            newState.topOffset = action.pageYOffset
            newState.elementH = action.elementH
            return newState
        case 'ELEMENT_MOVED':
            newState.coords = action.coords
            return newState
        case 'CLEAR_STATE':
            newState.coords = { top: 0, left: 0 }
            newState.initialTopOffset = 0
            newState.topOffset = 0
            newState.itemRemoved = false
            return newState;
        default:
            throw new Error();
    }
}

type HandleGrab = (pageYOffset: number, topStart: number, elementH: number) => void
type HandleMove = (coords: Coords) => void
type HandleDrop = (newPosition: number) => void

const ListItem = (props: OwnProps<any>) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const listContext = useContext(ListContext)
    const element = useRef<HTMLLIElement>(null)

    useEffect(() => {
        dispatch({ type: 'CLEAR_STATE' })
    }, [props.item])

    const updateTopOffset = () => {
        dispatch({ type: 'TOP_OFFSET_UPDATED', topOffset: window.pageYOffset })
    }

    const handleRemove = () => {
        dispatch({ type: 'ITEM_REMOVED' })
        setTimeout(remove, 500);
    }

    const remove = () => {
        if (element && element.current) {
            element.current.style.top = '0'
            element.current.style.left = '0'
            let newItems = cloneDeep(listContext.items)
            newItems.splice(props.index, 1)
            props.onRemove(props.item, newItems)
        }
    }

    const handleGrab: HandleGrab = (pageYOffset, topStart, elementH) => {
        dispatch({ type: 'ELEMENT_GRABBED', pageYOffset, topStart, elementH })
    }

    const handleMove: HandleMove = (coords) => {
        dispatch({ type: 'ELEMENT_MOVED', coords })
    }

    const handleDrop: HandleDrop = (newPosition) => {
        let newItems = cloneDeep(listContext.items)
        newItems.splice(newPosition, 0, newItems.splice(props.index, 1)[0])

        Promise.resolve(
            props.onDrop(newPosition, props.item, newItems)
        )
            .then(() => {
                dispatch({ type: 'CLEAR_STATE' })
                listContext.onDrop()
            })
            .catch(e => console.log(e))
    }

    const style = {
        top: state.coords.top + state.topOffset - state.initialTopOffset,
        left: state.coords.left,
    };

    const cx = classNames.bind(styles)
    const liClass = cx(
        'item',
        props.className,
        listContext.grabbedElement === props.index && props.grabbedClassName,
        {
            removed: state.itemRemoved,
            grabbed: listContext.grabbedElement === props.index,
        }
    )

    const itemContext = {
        onRemove: handleRemove,
        onGrab: handleGrab,
        onMove: handleMove,
        onDrop: handleDrop,
        updateTopOffset: updateTopOffset,
        element: element,
        elementH: state.elementH,
        index: props.index,
        initialTopOffset: state.initialTopOffset,
        topOffset: state.topOffset,
    }

    return (
        <ItemContext.Provider value={itemContext}>
            <li
                className={liClass}
                style={style}
                ref={element}
            >
                {props.children}
            </li>
        </ItemContext.Provider>
    )
}

export default ListItem