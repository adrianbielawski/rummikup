import React from 'react';
import styles from './input.scss';
import classNames from 'classnames/bind'

type Props = React.HTMLProps<HTMLInputElement>

const cx = classNames.bind(styles)

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const inputClass = cx(
        'input',
        props.className,
    ) 
    return (
        <input {...props} className={inputClass}  ref={ref} />
    )
})

export default Input