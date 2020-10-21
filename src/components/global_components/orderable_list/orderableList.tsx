import React, { ElementType, useReducer } from 'react'
import { cloneDeep } from 'lodash'
import RemoveButton from './list_item/remove_button/removeButton'
import Grabbable from './list_item/grabbable/grabbable'
import List from './list'
//Contexts
import { ListContext, reducer, initialState, HandleDrop, HandleRemove } from './listStore'

type ItemComponentProps<T> = {
    item: T
    index: number
}

type OwnProps<T> = {
    className?: string
    itemClassName?: string
    grabbedItemClassName?: string
    rightAnimation?: boolean,
    items: T[]
    itemComponent: ElementType<ItemComponentProps<T>>
    onDrop: (newPosition: number, item: T, newItems: T[]) => void
    onRemove: (item: T, newItems: T[]) => void
}

export const OrderableList = (props: OwnProps<any>) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const { onDrop, onRemove, ...rest } = props

    const handleDrop: HandleDrop = (newPosition) => {
        let newItems = cloneDeep(props.items)
        newItems.splice(newPosition, 0, newItems.splice(state.grabbedElement.index!, 1)[0])

        Promise.resolve(
            props.onDrop(newPosition, props.items[state.grabbedElement.index!], newItems)
        )
            .then(() => {
                dispatch({ type: 'CLEAR_STATE' })
            })
            .catch(e => console.log(e))
    }

    const handleRemove: HandleRemove = (index) => {
        let newItems = cloneDeep(props.items)
        newItems.splice(index, 1)
        
        props.onRemove(props.items[index], newItems)
    }

    const context = {
        state: {
            ...state,
            items: props.items,
        },
        dispatch,
        handleDrop,
        handleRemove,
    }

    return (
        <ListContext.Provider value={context}>
            <List {...rest} />
        </ListContext.Provider>
    )
}

OrderableList.RemoveButton = RemoveButton
OrderableList.Grabbable = Grabbable

export default OrderableList