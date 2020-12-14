import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { User } from './usersDetails';
import { Bookmarks } from './bookmarks';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            bookmarks: Bookmarks
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};