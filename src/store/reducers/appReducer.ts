import { AppState, AppActionTypes } from '../storeTypes';
import { cloneDeep } from 'lodash';

const initialState: AppState = {
    screenHeight: window.innerHeight,
};

const appReducer = (
    state = initialState,
    action: AppActionTypes
): AppState => {
    const newState = cloneDeep(state)
    switch (action.type) {
        case 'APP/SCREEN_HEIGHT_CHANGED':
            newState.screenHeight = action.screenHeight;
            return newState;
        default:
            return newState;
    }
}

export default appReducer;