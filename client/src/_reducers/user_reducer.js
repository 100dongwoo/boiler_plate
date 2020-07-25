import {
    LOGIN_USER,
    REGISTER_USER
    , AUTH_USER
} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER :
            return {...state, loginSuccess: action.payload}

        case REGISTER_USER:
            return {...state, register: action.payload}
            break;

        case AUTH_USER:
            return {
                ...state, userData: action.payload  //action.pay에 유저데이터 있다
            }
            break;


        default:
            return state
    }
}