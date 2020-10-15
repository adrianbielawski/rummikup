import React from 'react'
import styles from './playerSummary.scss'
//Custom Components
import place1st from 'assets/img/1st-place.png'
import place2nd from 'assets/img/2nd-place.png'
import place3rd from 'assets/img/3rd-place.png'
//Redux
import { PlayerType } from 'store/storeTypes'

type Props = {
    player: PlayerType,
    place: number,
    placeText: string
}

interface Images {
    [key: number]: string
}

const PlayerSummary = (props: Props) => {
    const getImg = () => {
        const images: Images = {
            1: place1st,
            2: place2nd,
            3: place3rd,
        }

        return <img src={images[props.place]}></img>
    }

    const player = props.player

    return (
        <li className={styles.playerSummary}>
            <div className={styles.place}>
                <p>{props.placeText} place</p>
                {getImg()}
            </div>
            <p className={styles.playerName}>{player.playerName}</p>
            <p>{player.score}</p>
        </li>
    )
}

export default PlayerSummary