import React, { MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useDoubleTap } from 'use-double-tap'
import classNames from 'classnames/bind'
import styles from './game.scss'
//Custom components
import Button from 'components/global_components/button/button'
import Modal from 'components/global_components/modal/modal'
import Timer from './timer/timer'
//Redux
import { startGame, switchPlayer, finishRound } from 'store/actions/appActions'
import { useTypedSelector } from 'store/reducers/index'
import CircleCountdown from 'components/global_components/circle_countdown/circleCountdown'
//Assets
import icon from 'assets/img/icon.svg'

type HandleFinishRound = () => void
type HandleStartGame = (e: MouseEvent<HTMLButtonElement>) => void

const Game = () => {
    const dispatch = useDispatch()
    const gameStarted = useTypedSelector(state => state.app.gameStarted)
    const rounCount = useTypedSelector(state => state.app.roundCount)
    const players = useTypedSelector(state => state.app.players)
    const timeLimit = useTypedSelector(state => state.app.timeLimit)
    const timeLeft = useTypedSelector(state => state.app.timeLeft)
    const currentPlayer = useTypedSelector(state => state.app.currentPlayer)
    const colors = players[currentPlayer].color

    const dblTap = useDoubleTap(() => {
        dispatch(switchPlayer())
    })

    const handleStartGame: HandleStartGame = (e) => {
        e.preventDefault
        dispatch(startGame())

    }

    const handleFinishRound: HandleFinishRound = () => {
        dispatch(finishRound())
    }

    const cx = classNames.bind(styles)
    const iconClass = cx(
        'countdownIcon',
        { large: timeLeft === 0 }
    )

    return (
        <div
            {...dblTap}
            className={styles.game}
            style={{ backgroundColor: colors[0] }}
        >
            <Modal show={!gameStarted} cardClassName={styles.modalCard}>
                <Button className={styles.startButton} onClick={handleStartGame}>
                    {`Start round ${rounCount}`}
                </Button>
            </Modal>
            {gameStarted && <Timer color={colors[1]} />}
            {gameStarted &&
                (
                    <div className={styles.countdownWrapper}>
                        <img src={icon} className={iconClass} style={{background: colors[1]}} />
                        <CircleCountdown
                            key={currentPlayer}
                            time={timeLimit}
                            color={colors[1]}
                            radius={100}
                            innerRadius={30}
                        />
                    </div>
                )
            }
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