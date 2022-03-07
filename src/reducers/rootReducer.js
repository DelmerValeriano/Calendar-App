import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarRenderer } from "./calendarReducers";
import { uiReducer } from "./uiReducer";



export const  rootReducer = combineReducers({
    ui:uiReducer,
    calendar:calendarRenderer,
    auth:authReducer
});

