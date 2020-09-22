import { createStore, combineReducers, applyMiddleware } from "redux";
import searchReducer from './reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ searchReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;