import React from 'react'

type OnRemove = () => void

type ItemContexType = {
    onRemove: OnRemove
    element: React.RefObject<HTMLLIElement> | null
    index: number | null
}

const ItemContext = React.createContext<ItemContexType>({
    onRemove: () => { },
    element: null,
    index: null,
})

export default ItemContext