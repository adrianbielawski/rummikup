import React, { useContext } from 'react'
import ItemContext from '../itemContext'

type Props = {
    className?: string
    children: any
}

const Button = (props: Props) => {
    const itemContext = useContext(ItemContext)

    return (
        <button onClick={itemContext.onRemove} {...props}>
            {props.children}
        </button>
    )
}

export default Button