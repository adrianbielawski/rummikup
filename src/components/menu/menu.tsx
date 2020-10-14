import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './menu.scss'
//Custom components
import TimeLimit from './timeLimit/timeLimit'
import AddPlayer from './addPlayer/addPlayer'
import Players from './players/players'
import Button from 'components/global_components/button/button'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { startGame } from 'store/actions/appActions';

type ValidateSettings = () => boolean
type HandleStartGame = () => void

const Menu = () => {
    const dispatch = useDispatch()
    const players = useTypedSelector(state => state.app.players)

    const handleStartGame: HandleStartGame = () => {
        const isValid = validateSettings()

        if (!isValid) {
            return
        }
        dispatch(startGame())
    }

    const validateSettings: ValidateSettings = () => {
        if (players.length <= 1) {
            alert('Min 2 players')
            return false
        }
        return true
    }

    return (
        <div className={styles.menu}>
            <TimeLimit />
            <AddPlayer />
            <Players />
            <Button
                className={styles.startButton}
                onClick={handleStartGame}
                disabled={players.length < 2}
            >
                Start game
            </Button>
        </div>
    )
}

export default Menu