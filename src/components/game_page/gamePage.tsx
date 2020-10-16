import React from 'react'
import styles from './gamePage.scss'
//Custom components
import Game from './game/game'
import SubtractPoints from './subtract_points/subtractPoints'
import GameSummary from './game_summary/gameSummary'
//Redux
import { useTypedSelector } from 'store/reducers/index'

type GetContent = () => React.ReactNode

const GamePage = () => {
    const gameCreated = useTypedSelector(state => state.app.gameCreated)
    const roundFinished = useTypedSelector(state => state.app.roundFinished)
    const gameFinished = useTypedSelector(state => state.app.gameFinished)

    const getContent: GetContent = () => {
        if (gameFinished) {
          return <GameSummary />
        } else if (roundFinished) {
          return <SubtractPoints />
        } else if (gameCreated) {
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
