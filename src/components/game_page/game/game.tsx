import React from 'react'
import { useDispatch } from 'react-redux'
import { useDoubleTap } from 'use-double-tap';
import styles from './game.scss'
//Custom components
import Button from 'components/global_components/button/button'
import Timer from './timer/timer'
//Redux
import { switchPlayer, finishRound } from 'store/actions/appActions'
import { useTypedSelector } from 'store/reducers/index'

type HandleFinishRound = () => void

const Game = () => {
    const dispatch = useDispatch()
    const players = useTypedSelector(state => state.app.players)
    const currentPlayer = useTypedSelector(state => state.app.currentPlayer)
    const colors = players[currentPlayer].color
    
    const dblTap = useDoubleTap(() => {
        dispatch(switchPlayer())
    })

    const handleFinishRound: HandleFinishRound = () => {
        dispatch(finishRound())
    }

    return (
        <div
            { ...dblTap }
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