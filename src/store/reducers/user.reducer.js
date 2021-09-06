  
import { SET_USER } from '../actions/user.actions';

const defaultState = null;

export const user = (state = defaultState, { type, payload }) => {
    // eslint-disable-next-line default-case
    switch (type) {
        case SET_USER: 
            return payload;
    }
    return state;
}