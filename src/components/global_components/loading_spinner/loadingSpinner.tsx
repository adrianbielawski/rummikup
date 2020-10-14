import React from 'react'
import styles from './loadingSpinner.scss'

type Props = {
    size?: number,
    background?: boolean,
}

const LoadingSpinner = (props: Props) => {
    return (
        <div
            className={`${styles.loader} ${!props.background && styles.noBackground}`}
            style={{ height: `${props.size}px`, width: `${props.size}px` }}
        >
            Loading...
        </div>
    )
}

export default LoadingSpinner