import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.scss'
//Custom components
import TimeLimit from './timeLimit/timeLimit'
//Redux
import { useTypedSelector } from '../../store/reducers/index'

const Menu = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.menu}>
            <TimeLimit />
        </div>
    )
}

export default Menu