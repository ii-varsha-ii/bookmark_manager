import * as ActionTypes from './ActionTypes';

export const Bookmarks = (state = {
    bookmarks : {}
}, action = {}) => {
    switch(action.type) {
        case ActionTypes.MODIFY_BOOKMARK:
            return {...state, bookmarks: action.payload};
        case ActionTypes.CLEAR_BOOKMARKS:
            return {...state, bookmarks: {}};
        default:
            return state;
    }
}
