import React, { useEffect } from 'react'
import styles from 'global_styles/app.scss'
import { useDispatch } from 'react-redux'
//Custom components
import Menu from 'components/menu/menu'
import GamePage from 'components/game_page/gamePage'
//Redux
import { useTypedSelector } from 'store/reducers/index'
import { changeScreenHeight } from 'store/actions/appActions'

const App = () => {
    const dispatch = useDispatch()
    const screenHeight = useTypedSelector(state => state.app.screenHeight)
    const gameCreated = useTypedSelector(state => state.app.gameCreated)

    const handleResize = () => {
        dispatch(changeScreenHeight(window.innerHeight))
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const getContent = () => {
        if (gameCreated) {
            return <GamePage />
        } else {
            return <Menu />
        }
    }

    return (
        <div className={styles.App} style={{ height: screenHeight }}>
            {getContent()}
        </div>
    )
}

export default App
