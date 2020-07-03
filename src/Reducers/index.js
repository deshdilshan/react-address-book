import { combineReducers } from 'redux';
import MainReducer from './MainReducer';

const appReducer = combineReducers({
    main: MainReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
        state = undefined;
    }

    return appReducer(state, action)
}

export default rootReducer;