import {combineReducers} from "redux";
 import user from './user_reducer'
//combineReducer : 리듀서를을 한개로 합쳐주는역할



const rootReducer =combineReducers({
    user
    //리듀서
    //리듀서       ..이런형식으로합쳐줌줌    //
})

export default rootReducer;