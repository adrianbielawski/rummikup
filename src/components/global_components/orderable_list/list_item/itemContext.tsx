import React from 'react'

interface Coords {
    top: number
    left: number
}

type HandleRemove = () => void
type HandleGrab = (pageYOffset: number, topStart: number, elementH: number) => void
type HandleMove = (coords: Coords) => void
type HandleDrop = (newPosition: number) => void
type UpdateTopOffset = () => void

type ItemContexType = {
    onRemove: HandleRemove
    onGrab: HandleGrab
    onMove: HandleMove
    onDrop: HandleDrop
    updateTopOffset: UpdateTopOffset
    element: React.RefObject<HTMLLIElement> | null
    elementH: number | null
    index: number | null
    initialTopOffset: number | null
    topOffset: number | null
}

const ItemContext = React.createContext<ItemContexType>({
    onRemove: () => { },
    onGrab: () => { },
    onMove: () => { },
    onDrop: () => { },
    updateTopOffset: () => { },
    element: null,
    elementH: null,
    index: null,
    initialTopOffset: null,
    topOffset: null,
});

export default ItemContext