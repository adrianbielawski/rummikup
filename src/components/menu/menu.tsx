import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.scss'
//Custom components
import TimeLimit from './timeLimit/timeLimit'
//Redux
import { useTypedSelector } from '../../store/reducers/index'
import AddPlayer from './addPlayer/addPlayer'
import Players from './players/players'

const Menu = () => {
    const dispatch = useDispatch()

    return (
        <div className={styles.menu}>
            <TimeLimit />
            <AddPlayer />
            <Players />
        </div>
    )
}

export default Menu