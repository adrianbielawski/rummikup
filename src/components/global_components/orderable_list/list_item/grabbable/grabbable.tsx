import React, { useContext, useEffect, useRef } from 'react'
import ItemContext from '../itemContext'
import { ListContext } from '../../listStore'

const SCROLL_STEP = 1

type Props = {
    className: string
    children: any
}

type HandleGrab = (e: TouchEvent | MouseEvent) => void
type Move = (e: TouchEvent | MouseEvent) => void
type HandleDrop = (e: TouchEvent | MouseEvent) => void

const Grabbable = (props: Props) => {
    const itemContext = useContext(ItemContext)
    const { state: listContext, dispatch, handleDrop: onDrop } = useContext(ListContext)
    const grabbableElementRef = useRef<HTMLDivElement | null>(null)
    const scrollInterval = useRef<ReturnType<typeof setTimeout> | null>(null)
    
    const { grabbedElement } = listContext

    const doScroll = () => {
        if (listContext.scrollStep! > 0 && window.innerHeight + window.pageYOffset >= document.body.clientHeight) {
            console.log(window.innerHeight, window.pageYOffset, document.body.clientHeight)
            return
        }
        if (listContext.scrollStep! < 0 && window.pageYOffset <= 0) {
            return
        }

        window.scrollBy({
            top: listContext.scrollStep!,
            left: 0,
        })
    }

    const handleGrab: HandleGrab = (e) => {
        e.preventDefault()
        if ((e as MouseEvent).buttons === 2) {
            return
        }

        if (listContext.items.length === 1) {
            return
        }
        
        if (e.type === 'touchstart' && (e as TouchEvent).touches.length > 1) {
            return
        }

        const elRect = itemContext.element!.current!.getBoundingClientRect()
        const startCoords = { top: elRect.y, left: elRect.x }
        const elementW = elRect.width
        const elementH = elRect.height

        let startX, startY
        if (e.type === 'mousedown') {
            startX = (e as MouseEvent).clientX
            startY = (e as MouseEvent).clientY
        } else {
            startX = (e as TouchEvent).touches[0].clientX
            startY = (e as TouchEvent).touches[0].clientY
        }
        const startGrabCoords = { x: startX, y: startY }

        dispatch({
            type: 'ELEMENT_GRABBED',
            index: itemContext.index,
            elementW,
            elementH,
            startCoords,
            startGrabCoords
        })
    }

    const move: Move = (e) => {
        let x, y
        if (e.type === 'touchmove') {
            x = (e as TouchEvent).touches[0].clientX
            y = (e as TouchEvent).touches[0].clientY
        } else if ((e as MouseEvent).buttons > 0) {
            x = (e as MouseEvent).clientX
            y = (e as MouseEvent).clientY
        } else {
            // no button pressed and it's not a touch event
            return
        }

        let scrollStep = null
        if (y >= window.innerHeight - grabbedElement.height! * .8) {
            scrollStep = SCROLL_STEP
        } else if (y <= grabbedElement.height! * .8) {
            scrollStep = -SCROLL_STEP
        }

        const top = y - grabbedElement.startGrabCoords.y + grabbedElement.startCoords.top
        const left = x - grabbedElement.startGrabCoords.x + grabbedElement.startCoords.left

        let distance = (
            top + window.pageYOffset - listContext.initialTopOffset - grabbedElement.startCoords.top
        ) / grabbedElement.height!

        distance = Math.round(distance)
        if (distance === -0) {
            distance = 0
        }

        dispatch({ type: 'ELEMENT_MOVED', coords: { top, left }, distance, scrollStep })
    }

    const handleDrop: HandleDrop = (e) => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current)
            scrollInterval.current = null
        }

        if (listContext.items.length === 1) {
            return
        }

        if (e.type === 'touchend' && (e as TouchEvent).touches.length > 0) {
            return
        }

        let newPosition = itemContext.index! + listContext.distance!
        if (newPosition < 1) {
            newPosition = 0
        } else if (newPosition >= listContext.items.length) {
            newPosition = listContext.items.length - 1
        }

        onDrop(newPosition)
    }

    const handleOnMouseLeave = () => {
        if (scrollInterval.current) {
            clearInterval(scrollInterval.current)
            scrollInterval.current = null
        }
        dispatch({ type: 'MOUSE_LEFT' })
    }

    useEffect(() => {
        if (grabbableElementRef.current) {
            grabbableElementRef.current.addEventListener('touchstart', handleGrab, { passive: false })
            grabbableElementRef.current.addEventListener('mousedown', handleGrab)
            if (grabbedElement.index === itemContext.index) {
                grabbableElementRef.current.addEventListener('touchend', handleDrop)
                grabbableElementRef.current.addEventListener('mouseup', handleDrop)
                document.body.addEventListener('mouseleave', handleOnMouseLeave)
            }
        }

        return () => {
            if (grabbableElementRef.current) {
                grabbableElementRef.current.removeEventListener('touchstart', handleGrab)
                grabbableElementRef.current.removeEventListener('touchend', handleDrop)
                grabbableElementRef.current.removeEventListener('mousedown', handleGrab)
                grabbableElementRef.current.removeEventListener('mouseup', handleDrop)
                document.body.removeEventListener('mouseleave', handleOnMouseLeave)
            }
        }
    }, [listContext.distance, grabbedElement, listContext.items, itemContext.index])

    useEffect(() => {
        if (listContext.scrollStep === null) {
            return
        }

        scrollInterval.current = setInterval(doScroll, 20)

        return () => {
            clearInterval(scrollInterval.current!)
            scrollInterval.current = null
        }
    }, [listContext.scrollStep])

    useEffect(() => {
        if (grabbedElement.index === null) {
            return
        }

        if (listContext.isTouchDevice) {
            window.addEventListener('touchmove', move)
        } else {
            window.addEventListener('mousemove', move)
        }

        return () => {
            window.removeEventListener('mousemove', move)
            window.removeEventListener('touchmove', move)
        }
    }, [grabbedElement.index])

    return (
        <div {...props} ref={grabbableElementRef}>
            {props.children}
        </div>
    )
}

export default Grabbable