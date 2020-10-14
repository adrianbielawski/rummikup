import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './players.scss'
import playerStyles from './player/player.scss'
//Custom components
import Player from './player/player'
import OrderableList from '../../global_components/orderable_list/orderableList'
//Redux Actions
import { playerRemoved, playersReordered } from '../../../store/actions/appActions'
import { PlayerType } from '../../../store/storeTypes'
import { useTypedSelector } from '../../../store/reducers'

type RemovePlayer = (item: PlayerType, newItems: PlayerType[]) => void
type PlayerDropped = (newPosition: number, item: PlayerType, newItems: PlayerType[]) => void

const Players = () => {
    const players = useTypedSelector(state => state.app.players)
    const dispatch = useDispatch()

    const removePlayer: RemovePlayer = (item, newItems) => {
        dispatch(playerRemoved(newItems))
    }

    const playerDropped: PlayerDropped = (newPosition, item, newItems) => {
        dispatch(playersReordered(newItems))
    }

    return (
        <OrderableList
            className={styles.players}
            itemClassName={playerStyles.player}
            grabbedItemClassName={playerStyles.grabbed}
            items={players}
            itemComponent={Player}
            onRemove={removePlayer}
            onDrop={playerDropped}
        />
    )
}

export default Players