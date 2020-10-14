import React from 'react'
import classNames from 'classnames/bind'
import styles from '../orderableList.scss'

type Props = {
    className?: string
    height: number
}

const Placeholder = (props: Props) => {
    const cx = classNames.bind(styles)
    const placeholderClass = cx('item', props.className, styles.placeholder)
    
    return (
        <li className={placeholderClass} style={{ height: `${props.height}px` }}></li>
    )
}

export default  Placeholder