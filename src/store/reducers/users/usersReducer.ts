import {
    USER_ADD,
    USER_DELETE,
    USER_UPDATE,
    USERS_FAIL,
    USERS_LOADING,
    USERS_STOP,
    USERS_SUCCESS
} from "../../types/users";
import {UsersActions, UsersState} from "./types";

const initialState : UsersState={
    loading: false,
    users: []
};

export default function (state = initialState, action: UsersActions): UsersState {
    switch (action.type) {
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            };
        case USERS_STOP:
            return{
                ...state,
                loading: false
            };
        case USERS_FAIL:
            return{
                ...state,
                loading: false
            };
        case USER_DELETE: {
            const id = action.payload;
            const userIndex = state.users.findIndex((user)=> user.id === id);
            return{
                ...state,
                users: [...state.users.slice(0,userIndex), ...state.users.slice(userIndex + 1)]
            };
        }
        case USER_UPDATE: {
            const updatedUser = action.payload;
            const userIndex = state.users.findIndex((user) => user.id === updatedUser.id);
            return {
                ...state,
                users: [...state.users.slice(0, userIndex), updatedUser, ...state.users.slice(userIndex + 1)]
            };
        }
        case USER_ADD: {
            const users = [...state.users];
            users.unshift(action.payload);
            return {
                ...state,
                users
            };
        }
        default:
            return state;
    }
}