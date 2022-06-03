import {createStore} from "redux"
import LoginReducer from "./Reducer/LoginReducer";
import { RootReducer } from "./Reducer/RootReducer";
import { applyMiddleware } from "redux";
import { compose } from "redux";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(LoginReducer,composeEnhancers(applyMiddleware(thunk)))

export default store;