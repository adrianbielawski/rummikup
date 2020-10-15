import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './gameSummary.scss'
//Components
import PlayersSummary from './players_summary/playersSummary'
import Button from 'components/global_components/button/button'
//Redux Actions
import { exitGame } from 'store/actions/appActions'

type HandleExit = () => void

const GameSummary = () => {
    const dispatch = useDispatch()

    const handleExit: HandleExit = () => {
        dispatch(exitGame())
    };

    return (
        <div className={styles.gameSummary}>
            <h2>Game results</h2>
            <div>
                <PlayersSummary />
                <Button className={styles.button} onClick={handleExit}>Exit</Button>
            </div>
        </div>
    )
}

export default GameSummary