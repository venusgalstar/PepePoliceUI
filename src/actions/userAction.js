import * as types from './types'

export const loginUser = (username, password) => {
    if(username == password)
        return {
            type: types.LOGIN_SUCCESS,
            payload: {username}
        };
    else
        return {
            type: types.LOGIN_FAILED,
            payload: {username}
        };
};
