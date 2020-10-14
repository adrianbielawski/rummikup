import React, { useRef, ElementType, useEffect, useReducer } from 'react'
//Custom Components
import ListItem from './list_item/listItem'
import RemoveButton from './list_item/remove_button/removeButton'
import Grabbable from './list_item/grabbable/grabbable'
import Placeholder from './placeholder/placeholder'
//Contexts
import ListContext from './listContext'

type ItemComponentProps<T> = {
    item: T
    index: number
}

type OwnProps<T> = {
    className?: string
    itemClassName?: string
    grabbedItemClassName?: string
    placeholderClassName?: string
    items: T[]
    itemComponent: ElementType<ItemComponentProps<T>>
    onDrop: (newPosition: number, item: T, newItems: T[]) => void
    onRemove: (item: T, newItems: T[]) => void
}

type State = {
    isTouchDevice: boolean
    grabbedElement: number | null
    grabbedElementH: number
    distance: number
    placeholder: number | null
}

type Action =
    | { type: 'DEVICE_INSPECTED', isTouchDevice: boolean }
    | { type: 'LIST_POSITION_CHECKED', listPosition: number | null }
    | { type: 'ELEMENT_GRABBED', index: number, elementH: number }
    | { type: 'DISTANCE_CHANGED', distance: number }
    | { type: 'PLACEHOLDER_UPDATED', placeholder: number | null }
    | { type: 'CLEAR_STATE' }

const initialState: State = {
    isTouchDevice: false,
    grabbedElement: null,
    grabbedElementH: 0,
    distance: 0,
    placeholder: null,
}

type HandleGrab = (index: number, elementH: number) => void
type HandleDrop = () => void
type HandleDistanceChange = (distance: number) => void
type GetPlaceholder = () => number | null

const reducer = (state: State, action: Action): State => {
    let newState = { ...state }
    switch (action.type) {
        case 'DEVICE_INSPECTED':
            newState.isTouchDevice = action.isTouchDevice
            return newState;
        case 'ELEMENT_GRABBED':
            newState.grabbedElement = action.index
            newState.grabbedElementH = action.elementH
            newState.distance = 0
            newState.placeholder = action.index
            return newState

        case 'DISTANCE_CHANGED':
            newState.distance = action.distance
            return newState

        case 'PLACEHOLDER_UPDATED':
            newState.placeholder = action.placeholder
            return newState

        case 'CLEAR_STATE':
            newState.grabbedElement = null
            newState.grabbedElementH = 0
            newState.distance = 0
            newState.placeholder = null
            return newState

        default:
            throw new Error()
    }
}

const OrderableList = (props: OwnProps<any>) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const listRef = useRef<HTMLUListElement>(null)

    const inspectDeviceScreen = () => {
        try {
            document.createEvent("TouchEvent")
            return true
        } catch (e) {
            return false
        }
    }

    const handleGrab: HandleGrab = (index, elementH) => {
        dispatch({ type: 'ELEMENT_GRABBED', index, elementH })
    }

    const handleDrop: HandleDrop = () => {
        dispatch({ type: 'CLEAR_STATE' })
    }

    const handleDistanceChange: HandleDistanceChange = (distance) => {
        dispatch({ type: 'DISTANCE_CHANGED', distance })
    }

    const getPlaceholder: GetPlaceholder = () => {
        if (state.grabbedElement !== null) {
            let placeholder: number | null = state.grabbedElement + state.distance

            if (state.grabbedElement <= placeholder) {
                placeholder += 1
            }
            if (placeholder >= props.items.length) {
                placeholder = props.items.length
            }
            if (placeholder <= 0) {
                placeholder = 0
            }

            return placeholder
        } else {
            return null
        }
    }

    const getListItems = () => {
        const ItemComponent = props.itemComponent
        const listItems = props.items.map((item, index) => {
            return (
                <ListItem
                    key={index}
                    className={props.itemClassName}
                    grabbedClassName={props.grabbedItemClassName}
                    item={item}
                    index={index}
                    onRemove={props.onRemove}
                    onDrop={props.onDrop}
                >
                    <ItemComponent item={item} index={index} />
                </ListItem>
            )
        })

        if (state.placeholder !== null) {
            listItems.splice(
                state.placeholder,
                0,
                <Placeholder
                    key={'placeholder'}
                    className={props.placeholderClassName}
                    height={state.grabbedElementH}
                />
            )
        }

        return listItems
    }

    useEffect(() => {
        if (state.distance !== null) {
            dispatch({ type: 'PLACEHOLDER_UPDATED', placeholder: getPlaceholder() })
        }
    }, [state.distance, state.placeholder])

    useEffect(() => {
        dispatch({ type: 'CLEAR_STATE' })
    }, [props.items])

    useEffect(() => {
        dispatch({ type: 'DEVICE_INSPECTED', isTouchDevice: inspectDeviceScreen() })
    }, [])

    const listContext = {
        onGrab: handleGrab,
        onDrop: handleDrop,
        onDistanceChange: handleDistanceChange,
        element: listRef,
        isTouchDevice: state.isTouchDevice,
        itemsLength: props.items.length,
        grabbedElement: state.grabbedElement,
        distance: state.distance,
        items: props.items,
    }

    return (
        <ListContext.Provider value={listContext}>
            <ul className={props.className} ref={listRef}>
                {getListItems()}
            </ul>
        </ListContext.Provider>
    );
}

OrderableList.defaultProps = {
    onRemove: () => { },
}

OrderableList.RemoveButton = RemoveButton
OrderableList.Grabbable = Grabbable

export default OrderableList