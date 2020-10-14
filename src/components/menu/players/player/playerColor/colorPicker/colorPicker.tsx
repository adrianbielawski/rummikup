import React from 'react'
import { useDispatch } from 'react-redux'
import styles from './colorPicker.scss'
//Custom components
import Color from '../color/color'
import { COLORS } from '../../../../../../constants/constants'
//Redux Actions
import { changePlayerColor } from '../../../../../../store/actions/appActions'

type Props = {
    playerId: number
}
type HandleColorChange = () => void

const ColorPicker = (props: Props) => {
    const dispatch = useDispatch()
    const getColors = () => {
        return Object.entries(COLORS).map((color, i) => {
            const handleColorChange: HandleColorChange = () => {
                dispatch(changePlayerColor(props.playerId, color))
            }
            return <Color key={i} color={color[0]} onClick={handleColorChange} />
        })
    }

    return (
        <div className={styles.colorPicker}>
            {getColors()}
        </div>
    );
}

export default ColorPicker