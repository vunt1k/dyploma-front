import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import { root } from './reducers/root.reducer';

export const store = createStore(root, applyMiddleware(thunk));