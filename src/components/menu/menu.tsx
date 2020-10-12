import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './menu.scss';
//Custom components
//Redux
import { useTypedSelector  } from '../../store/reducers/index';

const Menu: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.menu}>
        </div>
    );
}

export default Menu;