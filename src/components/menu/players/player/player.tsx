import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from './player.scss'
//Custom components
import OrderableList from '../../../global_components/orderable_list/orderableList'
import PlayerColor from './playerColor/playerColor'

type Props = {
    item: any,
    index: number,
}

const Player = (props: Props) => {
    const player = props.item
    return (
        <div className={styles.wrapper} key={player.id}>
            <PlayerColor player={player} />
            <OrderableList.Grabbable className={styles.playerNameWrapper}>
                <p className={styles.playerName}>
                    {props.index + 1}: <span> {player.playerName}</span>
                </p>
            </OrderableList.Grabbable>
            <OrderableList.RemoveButton className={styles.removeButton}>
                <FontAwesomeIcon icon={faTimes} />
            </OrderableList.RemoveButton>
        </div>
    )
}

export default Player