import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import classNames from 'classnames/bind'
import styles from './modal.scss'
//Custom components
import Card from 'components/global_components/card/card'
import { useTypedSelector } from 'store/reducers/index'

type Props = {
    className?: string,
    cardClassName?: string,
    show: boolean,
    children: any,
}

const Modal = (props: Props) => {
    const [showCard, setShowCard] = useState(false)
    const [top, setTop] = useState(0)
    const screenHeight = useTypedSelector(state => state.app.screenHeight)

    const updatePosition = () => {
        setTop(window.pageYOffset)
    }

    useEffect(() => {
        setShowCard(true)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', updatePosition)

        return () => {
            window.removeEventListener('scroll', updatePosition)
        }
    }, [])

    const cx = classNames.bind(styles)
    const modalClass = cx('modal', props.className)
    const cardClass = cx(
        'card',
        props.cardClassName,
        {
            [styles.show]: showCard
        }
    )

    return (
        <>
        {props.show && ReactDOM.createPortal(
            <div className={modalClass} style={{ top, height: screenHeight }}>
                <div className={styles.wrapper}>
                    <Card className={cardClass}>
                        {props.children}
                    </Card>
                </div>
            </div>, document.body
        )}
            </>
    )
}

export default Modal