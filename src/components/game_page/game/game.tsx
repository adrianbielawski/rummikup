import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './game.scss'
//Custom components
import Button from 'components/global_components/button/button'
//Redux actions
import { finishRound } from 'store/actions/appActions'
import { useTypedSelector } from 'store/reducers'
import Timer from './timer/timer'

type HandleFinishRound = () => void

const Game = () => {
    const dispatch = useDispatch()
    const players = useTypedSelector(state => state.app.players)
    const currentPlayer = useTypedSelector(state => state.app.currentPlayer)
    const colors = players[currentPlayer].color

    const handleFinishRound: HandleFinishRound = () => {
        dispatch(finishRound())
    }

    return (
        <div
            className={styles.game}
            style={{ backgroundColor: colors[0] }}
        >
            <Timer color={colors[1]}/>
            <p
                className={styles.playerName}
                style={{ color: colors[1] }}
            >
                {players[currentPlayer].playerName}
            </p>
            <Button className={styles.finishButton} onClick={handleFinishRound}>
                Finish round
            </Button>
        </div>
    )
}

export default Game