import { combineReducers } from "redux";
import { user } from './user.reducer';

export const root = combineReducers({
    user
})