import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import styles from './timer.scss'
//Custom Components
import LoadingSpinner from 'components/global_components/loading_spinner/loadingSpinner'
//Redux Actions
import { timerUpdated, timeOut, updateTimeEnd } from 'store/actions/appActions'
import { useTypedSelector } from 'store/reducers'
//Assets
import beep from 'assets/audio/beep.mp3'
import longBeep from 'assets/audio/beep.mp3'

const AUDIO = {
    beep: new Audio(beep),
    longBeep: new Audio(longBeep)
};

type Props = {
    color: string,
}
type UpdateTimer = () => void
type GetTimeEnd = () => moment.Moment
type GetTimer = () => React.ReactNode | string

const Timer = (props: Props) => {
    const dispatch = useDispatch()
    const timerInterval = useRef<ReturnType<typeof setTimeout> | null>(null)
    const timeEnd = useTypedSelector(state => state.app.timeEnd)
    const timeLeft = useTypedSelector(state => state.app.timeLeft)
    const timeLimit = useTypedSelector(state => state.app.timeLimit)

    useEffect(() => {
        dispatch(updateTimeEnd(getTimeEnd()))
    }, [])

    useEffect(() => {
        updateTimer()
            timerInterval.current = setInterval(updateTimer, 1000)
        return () => {
            if (timerInterval.current) {
                clearInterval(timerInterval.current)
            }
        }
    }, [timeEnd.valueOf()])

    useEffect(() => {
        if ((timeLeft % 30 === 0 && timeLeft !== timeLimit || timeLeft <= 10) && timeLeft !== 0) {
            AUDIO.beep.play()
        }

        if (timeLeft !== null && timeLeft <= 0) {
            AUDIO.longBeep.play()
            setTimeout(() => {
                dispatch(timeOut())
            }, 1000)
        }
    }, [timeLeft])

    const updateTimer: UpdateTimer = () => {
        dispatch(timerUpdated())
    }

    const getTimeEnd: GetTimeEnd = () => {
        return moment().add(timeLimit, 'seconds')
    }

    const getTimer: GetTimer = () => {
        if (timeLeft === null) {
            return <LoadingSpinner background={true} />
        }
        const duration = moment.duration(timeLeft, 'seconds')
        let timer = timeLeft >= 3600 ? duration.format('HH:mm:ss') : duration.format('mm:ss', { trim: false })
        return timer
    }

    return (
        <div className={styles.timerWrapper}>
            <div
                className={styles.timer}
                style={{ color: props.color }}
            >
                {getTimer()}
            </div>
        </div>
    )
}

export default Timer