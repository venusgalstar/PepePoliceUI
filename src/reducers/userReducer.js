import * as types from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                type: types.LOGIN_SUCCESS,
                username: action.payload.username,
            };
        case types.LOGIN_FAILED:
            return {
                ...state,
                type: types.LOGIN_FAILED,
                username: action.payload.username,
            };
        default:
            return state;
    }
}
