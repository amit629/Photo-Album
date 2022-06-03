import LoginReducer from "./LoginReducer";
import AlbumReducer from "./AlbumReducer";

import { combineReducers } from "redux";

 const RootReducer=combineReducers({
    LoginReducer,
    AlbumReducer
})
export default RootReducer;



