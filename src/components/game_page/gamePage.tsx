import React from 'react'
import styles from './gamePage.scss'
//Custom components
import Game from './game/game'
import { useTypedSelector } from 'store/reducers'
import SubtractPoints from './subtract_points/subtractPoints'

type GetContent = () => React.ReactNode

const GamePage = () => {
    const gameStarted = useTypedSelector(state => state.app.gameStarted)
    const roundFinished = useTypedSelector(state => state.app.roundFinished)

    const getContent: GetContent = () => {
        if (roundFinished) {
            return <SubtractPoints />
          } else if (gameStarted) {
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
