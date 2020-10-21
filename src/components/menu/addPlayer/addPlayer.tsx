import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import styles from './addPlayer.scss'
//Custom components
import Button from 'components/global_components/button/button'
import Input from 'components/global_components/input/input'
//Redux Actions
import { useTypedSelector } from 'store/reducers/index'
import { addPlayer } from 'store/actions/appActions'

type Error = [string, object?] | null

interface IsValidObj {
    valid: boolean,
    error: Error
}

type CheckPlayers = (playerName: string) => boolean
type ValidatePlayerName = (playerName: string) => IsValidObj 
type HandleSubmit = (e: React.MouseEvent) => void

const AddPlayer = () => {
    const dispatch = useDispatch()
    const playerNameInput = useRef<HTMLInputElement>(null)
    const players = useTypedSelector(state => state.app.players)

    const checkPlayers: CheckPlayers = (playerName) => {
        const lowPlayerName = playerName.toLowerCase()
        const playersNames = players.map(player => {
            return player.playerName.toLowerCase()
        })
        return playersNames.includes(lowPlayerName)
    }

    const validatePlayerName: ValidatePlayerName = (playerName) => {
        let error: Error = null
        const isPlayerExists = checkPlayers(playerName)

        if (players.length >= 4) {
            error = ['Max 4 players']
        }
        if (isPlayerExists) {
            error = [`Player with name ${playerName} aleready exists`]
        }
        if (playerName.length < 1) {
            error = ["Please type in player's name"]
        }

        return {
            valid: error === null,
            error,
        }
    }

    const handleSubmit: HandleSubmit = (e) => {
        e.preventDefault()
        if (playerNameInput && playerNameInput.current) {
            const playerName = playerNameInput.current.value.trim()
            const { valid, error } = validatePlayerName(playerName)
            if (!valid) {
                alert(error)
                return
            }

            playerNameInput.current.value = ''
            dispatch(addPlayer(playerName))
        }
    }

    return (
        <div className={styles.addPlayer}>
            <p>Add player</p>
            <div className={styles.form}>
                <Input
                    className={styles.playerNameInput}
                    type="text"
                    autoComplete="false"
                    spellCheck="false"
                    maxLength={30}
                    ref={playerNameInput}
                />
                <Button className={styles.addButton} onClick={handleSubmit} round>
                    <FontAwesomeIcon icon={faPlus} className="plus" />
                </Button>
            </div>
        </div>
    )
}

export default AddPlayer