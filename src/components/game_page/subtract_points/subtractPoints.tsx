import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './subtractPoints.scss';
//Custom components
import Button from 'components/global_components/button/button';
import PlayerSubPoints from './player_subtract_points/playerSubtractPoints';
//Redux actions
import { nextRound, finishGame } from 'store/actions/appActions';
import { useTypedSelector } from 'store/reducers/index';
import { Points } from 'store/storeTypes'

type HandleNextRound = (e: React.MouseEvent<HTMLButtonElement>) => void
type HandleFinishGame = () => void
type OnChange = (e: React.ChangeEvent<HTMLInputElement>) => void

const SubtractPoints = () => {
    const dispatch = useDispatch()
    const players = useTypedSelector(state => state.app.players)
    const [points, setPoints] = useState<Points>({});

    const handleNextRound: HandleNextRound = (e) => {
        e.preventDefault();
        dispatch(nextRound(players, points))
    }

    const handleFinishGame: HandleFinishGame = () => {
        dispatch(finishGame(players, points))
    }

    const getPlayers = () => {
        return players.map((player, i) => {
            const onChange: OnChange = e =>
                setPoints({
                    ...points,
                    [i]: parseInt(e.target.value) || 0,
                });

            return (
                <PlayerSubPoints
                    playerName={player.playerName}
                    key={i}
                    onChange={onChange}
                />
            )
        });
    };

    const pointsValues = Object.values(points)
    const isValid = pointsValues.filter(val => val > 0).length === players.length - 1

    return (
        <div className={styles.subtractPoints}>
            <h2>Subtract points</h2>
            <ul className={styles.players}>
                {getPlayers()}
            </ul>
            <div className={styles.buttons}>
                <Button className={styles.button} onClick={handleNextRound} disabled={!isValid}>
                    Next round
                </Button>
                <Button className={styles.button} onClick={handleFinishGame} disabled={!isValid}>
                    Finish game
                </Button>
            </div>
        </div>
    )
}

export default SubtractPoints