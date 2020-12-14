import * as ActionTypes from './ActionTypes';

export const User = (state = {
    id: '',
    name: '',
    email: '',
    status: false
    }, action = {}) => {
    switch(action.type) {
        case ActionTypes.SET_USER:
            return {...state, id: action.payload.id, name: action.payload.firstname, email: action.payload.email, status: action.payload.status};
        case ActionTypes.LOGOUT:
            return {...state, id: '', name: '', email: '', status: 'False'};
        default:
            return state;
    }
}
