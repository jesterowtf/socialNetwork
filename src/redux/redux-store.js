import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer"
import thunk from 'redux-thunk';
import appReducer from "./app-reducer";
import feedReducer from "./feed-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    feed: feedReducer
})


let store = legacy_createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;