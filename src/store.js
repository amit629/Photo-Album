import {createStore} from "redux"
import Reducer from "./Reducer/Reducer";
import rootReducer from "./Reducer/RootReducer"
import { applyMiddleware } from "redux";
import { compose } from "redux";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(Reducer,composeEnhancers(applyMiddleware(thunk)))

export default store;