import {combineReducers} from "redux";
import categoriesReducer from "./categories/categoriesReducer";
import lecturesReducer from "./lectures/lecturesReducer";
import authReducer from "./auth/authReducer";
import usersReducer from "./users/usersReducer";

export default combineReducers({
        auth: authReducer,
        users: usersReducer,
        lectures: lecturesReducer,
        categories: categoriesReducer,
    }
)