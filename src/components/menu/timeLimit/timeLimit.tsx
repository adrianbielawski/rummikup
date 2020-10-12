import React from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import 'moment-duration-format'
import styles from './timeLimit.scss'
//Custom Components
import Input from '../../global_components/input/input'
//Redux
import { useTypedSelector } from '../../../store/reducers/index'
import { updateTimeLimit } from '../../../store/actions/appActions'

type HandleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => void

const TIME_FORMAT = 'HH:mm:ss'

const TimeLimit = () => {
    const dispatch = useDispatch()
    const timeLimit = useTypedSelector(state => state.app.timeLimit)
    const defaultTime = moment.duration(timeLimit, 'seconds').format(TIME_FORMAT, { trim: false })

    const handleTimeChange: HandleTimeChange = (e) => {
        let val = e.target.value
        let timeLimit = moment.duration(val).asSeconds()
        dispatch(updateTimeLimit(timeLimit))
    }

    return (
        <div className={styles.timeLimit}>
            <p>Time limit</p>
            <Input 
                type="time"
                onChange={handleTimeChange}
                defaultValue={defaultTime}
                step="1"
                required
            />
        </div>
    )
}

export default TimeLimit