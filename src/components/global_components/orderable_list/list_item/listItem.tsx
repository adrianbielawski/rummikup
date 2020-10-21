import React, { useState, useRef, useContext } from 'react'
import classNames from 'classnames/bind'
import styles from '../orderableList.scss'
//Contexts
import ItemContext from './itemContext'
import { ListContext } from '../listStore'

type Props<T> = {
    className?: string
    grabbedClassName?: string
    rightAnimation?: boolean
    transition: boolean
    transform: boolean
    item: T
    index: number
    children: React.ReactNode
}

type HandleRemove = () => void
type GetDynamicStyles = () => object

type DynamicStylesType = {
    transform: string | boolean,
    top?: number,
    left?: number,
    width?: number,
}

const ListItem = (props: Props<any>) => {
    const { state: listContext, handleRemove: onRemove } = useContext(ListContext)
    const element = useRef(null)
    const [itemRemoved, setItemRemoved] = useState(false)

    const { grabbedElement } = listContext
    const isGrabbed = grabbedElement.index === props.index

    const handleRemove: HandleRemove = () => {
        setItemRemoved(true)
        setTimeout(() => onRemove(props.index), 500)
    }

    const getDynamicStyles: GetDynamicStyles = () => {
        if (grabbedElement.index === null) {
            return {}
        }

        let styles: DynamicStylesType = {
            transform: props.transform && `translate(0px, ${grabbedElement.height}px)`,
        }
        
        if (isGrabbed) {
            styles = {
                ...styles, 
                top: grabbedElement.coords.top,
                left: grabbedElement.coords.left,
                width: grabbedElement.width!,
            }
        }
        
        return styles
    }

    const liClass = classNames(
        styles.item,
        props.className,
        isGrabbed && props.grabbedClassName,
        {
            [styles.removed]: itemRemoved,
            [styles.grabbed]: isGrabbed,
            [styles.transition]: props.transition,
            [styles.rightAnimation]: props.rightAnimation,
        }
    )

    const itemContext = {
        onRemove: handleRemove,
        element,
        index: props.index,
    }

    return (
        <ItemContext.Provider value={itemContext}>
            <li
                className={liClass}
                style={getDynamicStyles()}
                ref={element}
            >
                {props.children}
            </li>
        </ItemContext.Provider>
    )
}

export default ListItem