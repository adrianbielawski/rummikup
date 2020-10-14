import React, { useContext, useReducer, useEffect, useRef } from 'react'
import ItemContext from '../itemContext'
import ListContext from '../../listContext'

const SCROLL_STEP = 1;

type Props = {
    className: string
    children: any
}

interface MoveData {
    startX: number
    startY: number
    topStart: number
}

type State = {
    moveData: MoveData
    scrollStep: number
}

const initialState = {
    moveData: { startX: 0, startY: 0, topStart:0 },
    scrollStep: 0,
}

type Action =
    | { type: 'ELEMENT_GRABBED', startX: number, startY: number, topStart: number }
    | { type: 'ELEMENT_MOVED', scrollStep: number }

const reducer = (state: State, action: Action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'ELEMENT_GRABBED':
            newState.moveData = {
                startX: action.startX,
                startY: action.startY,
                topStart: action.topStart,
            };
            return newState
        case 'ELEMENT_MOVED':
            newState.scrollStep = action.scrollStep
            return newState
        default:
            throw new Error()
    }
}

type HandleGrab = (e: TouchEvent | MouseEvent) => void
type Move = (e: TouchEvent | MouseEvent) => void
type HandleDrop = (e: TouchEvent | MouseEvent) => void

const Grabbable = (props: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const itemContext = useContext(ItemContext)
    const listContext = useContext(ListContext)
    const grabbableElementRef = useRef<HTMLDivElement | null>(null)
    const scrollInterval = useRef<ReturnType<typeof setTimeout> | null>(null)

    const updateTopOffset = () => {
        itemContext.updateTopOffset()
    }

    const doScroll = () => {
        if (state.scrollStep > 0 && window.innerHeight + window.pageYOffset >= document.body.clientHeight) {
            return
        }
        if (state.scrollStep < 0 && window.pageYOffset <= 0) {
            return
        }

        window.scrollBy({
            left: 0,
            top: state.scrollStep,
        })
    }

    const handleGrab: HandleGrab = (e) => {
        e.preventDefault()

        if (listContext.itemsLength === 1) {
            return
        }
        
        if (e.type === 'touchstart' && (e as TouchEvent).touches.length > 1) {
            return
        }

        let itemPosition = 0
        let listPosition = 0
        let elementH = 0
        if(itemContext.element && listContext.element) {
            itemPosition = itemContext.element.current!.getBoundingClientRect().top
            listPosition = listContext.element.current!.getBoundingClientRect().top
            elementH = itemContext.element.current!.getBoundingClientRect().height
        }

        const topStart = itemPosition - listPosition

        let startX
        let startY
        if (e.type === 'mousedown') {
            startX = (e as MouseEvent).clientX;
            startY = (e as MouseEvent).clientY;
        } else {
            startX = (e as TouchEvent).touches[0].clientX;
            startY = (e as TouchEvent).touches[0].clientY;
        }

        dispatch({ type: 'ELEMENT_GRABBED', startX, startY, topStart })

        itemContext.onGrab(
            window.pageYOffset,
            topStart,
            elementH,
        );

        listContext.onGrab(itemContext.index!, elementH)
    }

    const move: Move = (e) => {
        let x
        let y
        if (e.type === 'mousemove') {
            x = (e as MouseEvent).clientX
            y = (e as MouseEvent).clientY
        } else {
            x = (e as TouchEvent).touches[0].clientX
            y = (e as TouchEvent).touches[0].clientY
        }

        let scrollStep = 0
        if (y >= window.innerHeight - itemContext.elementH! * .8) {
            scrollStep = SCROLL_STEP
        } else if (y <= itemContext.elementH! * .8) {
            scrollStep = -SCROLL_STEP
        }

        const newTop = y - state.moveData.startY + state.moveData.topStart
        const newLeft = x - state.moveData.startX

        let newDistance = (
            newTop + itemContext.topOffset! - itemContext.initialTopOffset! - state.moveData.topStart
        ) / itemContext.elementH!

        newDistance = Math.round(newDistance)
        if (newDistance === -0) {
            newDistance = 0
        };

        dispatch({ type: 'ELEMENT_MOVED', scrollStep })
        listContext.onDistanceChange(newDistance)
        itemContext.onMove({ top: newTop, left: newLeft })
    };

    const handleDrop: HandleDrop = (e) => {
        if (listContext.itemsLength === 1) {
            return
        }

        if (e.type === 'touchstart' && (e as TouchEvent).touches.length > 0) {
            return
        }

        let newPosition = itemContext.index! + listContext.distance
        if (newPosition < 1) {
            newPosition = 0
        } else if (newPosition >= listContext.itemsLength) {
            newPosition = listContext.itemsLength - 1
        }

        if (scrollInterval.current) {
            clearInterval(scrollInterval.current!)
            scrollInterval.current = null
        }

        itemContext.onDrop(newPosition)
    }

    useEffect(() => {
        if (grabbableElementRef && grabbableElementRef.current) {
            grabbableElementRef.current.addEventListener('touchstart', handleGrab, { passive: false })
            grabbableElementRef.current.addEventListener('touchend', handleDrop)
            grabbableElementRef.current.addEventListener('mousedown', handleGrab)
            grabbableElementRef.current.addEventListener('mouseup', handleDrop)
        }

        return () => {
            if (grabbableElementRef && grabbableElementRef.current) {
                grabbableElementRef.current.removeEventListener('touchstart', handleGrab)
                grabbableElementRef.current.removeEventListener('touchend', handleDrop)
                grabbableElementRef.current.removeEventListener('mousedown', handleGrab)
                grabbableElementRef.current.removeEventListener('mouseup', handleDrop)
            }
        };
    }, [itemContext.elementH, listContext.distance, itemContext.index, listContext.grabbedElement, listContext.items])

    useEffect(() => {
        if (state.scrollStep !== null && !scrollInterval.current) {
            scrollInterval.current = setInterval(doScroll, 3)
        }
        return () => {
            clearInterval(scrollInterval.current!)
            scrollInterval.current = null;
        };
    }, [state.scrollStep, scrollInterval.current])


    useEffect(() => {
        if (listContext.grabbedElement === itemContext.index) {
            window.document.body.style.overscrollBehavior = 'contain'
            window.addEventListener('scroll', updateTopOffset)

            if (listContext.isTouchDevice) {
                window.addEventListener('touchmove', move)
            } else {
                window.addEventListener('mousemove', move)
            }
        }

        return () => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('touchmove', move)
            window.removeEventListener('scroll', updateTopOffset)
            window.document.body.style.overscrollBehavior = 'unset'
        };
    }, [listContext.grabbedElement === itemContext.index, move])

    return (
        <div {...props} ref={grabbableElementRef}>
            {props.children}
        </div>
    )
}

export default Grabbable