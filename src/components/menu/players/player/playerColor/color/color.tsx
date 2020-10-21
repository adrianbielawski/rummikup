import React from 'react'
import styles from './color.scss'

type Props = {
    color: string
    onClick?: () => void
}

const Color = (props: Props) => {
    return (
        <div
            className={styles.color}
            style={{ backgroundColor: props.color }}
            onClick={props.onClick}
        >
        </div>
    )
}

export default Color