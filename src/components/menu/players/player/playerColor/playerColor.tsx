import React, { useState } from 'react'
import styles from './playerColor.scss'
//Custom components
import Color from './color/color'
import ColorPicker from './colorPicker/colorPicker'

type Props<T> = {
    player: T
}

const PlayerColor = (props: Props<any>) => {
    const [show, setShow] = useState(false)
    const toggleColorPicker = () => {
        setShow(!show)
    }

    return (
        <div className={styles.playerColor} onClick={toggleColorPicker}>
            <Color color={props.player.color[0]} />
            {show && <ColorPicker playerId={props.player.id} />}
        </div>
    );
}

export default PlayerColor