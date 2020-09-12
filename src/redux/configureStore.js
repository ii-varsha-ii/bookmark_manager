import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { LoadUserData } from './usersDetails';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: LoadUserData
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};