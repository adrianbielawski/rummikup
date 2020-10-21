import React from 'react'
import styles from './playersSummary.scss'
//Components
import PlayerSummary from './player_summary/playerSummary'
//Redux
import { useTypedSelector } from 'store/reducers/index'

type GetPlayersSummary = () => React.ReactNode[]

const PlayersSummary = () => {
    const players = useTypedSelector(state => state.app.players)
    const getPlayersSummary: GetPlayersSummary = () => {
        let sortedPlayers = [...players]
        sortedPlayers.sort((a, b) => {
            return b.score - a.score
        })

        let previousPlayerScore: number
        let previousPlayerPlaceText = ''
        let previousPlace: number
        let playersSummary = sortedPlayers.map((player, index) => {
            const placeTexts = ['1st', '2nd', '3rd', '4th']
            let place = index + 1
            let placeText = placeTexts[index]

            if (player.score === previousPlayerScore) {
                placeText = previousPlayerPlaceText
                place = previousPlace
            }

            previousPlayerScore = player.score
            previousPlayerPlaceText = placeText
            previousPlace = place

            return <PlayerSummary player={player} placeText={placeText} place={place} key={index} />
        })
        return playersSummary
    }

    return (
        <ul className={styles.results}>
            {getPlayersSummary()}
        </ul>
    )
}

export default PlayersSummary