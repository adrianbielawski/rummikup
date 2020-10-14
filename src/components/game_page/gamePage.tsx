import React from 'react'
import styles from './gamePage.scss'
//Custom components
import Game from './game/game'
import { useTypedSelector } from '../../store/reducers'

type GetContent = () => React.ReactNode

const GamePage = () => {
    const gameStarted = useTypedSelector(state => state.app.gameStarted)

    const getContent: GetContent = () => {
        if (gameStarted) {
            return <Game />
        }
    }

    return (
        <div className={styles.gamePage}>
            {getContent()}
        </div>
    )
}

export default GamePage
