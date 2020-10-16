import React from 'react'
import styles from './card.scss'

type Props = {
    className?: string,
    children: any,
}

const Card = React.forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    return (
        <div className={`${styles.card} ${props.className || ''}`} ref={ref}>
            {props.children}
        </div>
    )
})

export default Card