import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { plotReducer } from "./Plot/Reducer";

const rootReducers = combineReducers({

    auth:authReducer,
    plot:plotReducer

});

export const store = legacy_createStore(rootReducers,applyMiddleware(thunk));