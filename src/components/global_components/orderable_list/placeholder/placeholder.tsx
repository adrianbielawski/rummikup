import React from 'react'
import classNames from 'classnames/bind'
import styles from './placeholder.scss'

const cx = classNames.bind(styles)

type Props = {
    className?: string
    height: number
    rightAnimation?: boolean
}

const Placeholder = (props: Props) => {
    const placeholderClass = cx(
        'placeholder',
        { rightAnimation: props.rightAnimation },
    )

    return (
        <li
            className={placeholderClass}
            style={{ height: `${props.height}px` }}>
        </li>
    )
}

export default  Placeholder