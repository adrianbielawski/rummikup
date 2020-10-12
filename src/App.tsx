import React, { useEffect } from 'react';
import styles from './global_styles/app.scss';
import { useDispatch } from 'react-redux';
//Custom components
import Menu from './components/menu/menu';
//Redux
import { useTypedSelector  } from './store/reducers/index';
import { changeScreenHeight } from './store/actions/appActions';

type HandleResize = () => void;

const App: React.FC = () => {
    const dispatch = useDispatch();
    const screenHeight = useTypedSelector(state => state.app.screenHeight);

    const handleResize: HandleResize = () => {
        dispatch(changeScreenHeight(window.innerHeight))
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <div className={styles.App} style={{ height: screenHeight }}>
            <Menu />
        </div>
    );
}

export default App;
