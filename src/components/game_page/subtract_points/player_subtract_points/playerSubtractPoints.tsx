import React from 'react'
import styles from './playerSubtractPoints.scss'
//Custom Components
import Input from 'components/global_components/input/input'

type Props = {
    playerName: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PlayerSubPoints = (props: Props) => {
    return (
        <li className={styles.player}>
            <div className={styles.playerName}>{props.playerName}</div>
            <Input type="number" placeholder="0" onChange={props.onChange} />
        </li>
    )
}
export default PlayerSubPoints