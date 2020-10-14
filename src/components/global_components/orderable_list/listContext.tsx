import React from 'react'

type HandleGrab = (index: number, elementH: number) => void
type HandleDrop = () => void
type HandleDistanceChange = (distance: number) => void

type ListContextType<T> = {
    onGrab: HandleGrab
    onDrop: HandleDrop
    onDistanceChange: HandleDistanceChange
    element: React.RefObject<HTMLUListElement> | null
    itemsLength: number
    items: T[]
    isTouchDevice: boolean
    grabbedElement: number | null
    distance: number
}

const ListContext = React.createContext<ListContextType<any>>({
    onGrab: () => {},
    onDrop: () => {},
    onDistanceChange: () => {},
    element: null,
    itemsLength: 0,
    items: [],
    isTouchDevice: false,
    grabbedElement: null,
    distance: 0,
});

export default ListContext