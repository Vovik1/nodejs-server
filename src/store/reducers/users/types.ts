import {
    USER_ADD,
    USER_DELETE,
    USER_UPDATE,
    USERS_FAIL,
    USERS_LOADING,
    USERS_STOP,
    USERS_SUCCESS
} from "../../types/users";
import User from "../../../models/user";

export interface UsersState {
    loading: boolean,
    users: User[]
}

interface UsersLoadingAction {
    type: typeof USERS_LOADING
}

interface UsersSuccessAction {
    type: typeof USERS_SUCCESS
    payload: User[]
}

interface UsersStopAction {
    type: typeof USERS_STOP
}

interface UsersFailAction {
    type: typeof USERS_FAIL
}

interface UsersUpdateAction{
    type: typeof USER_UPDATE
    payload: User
}

interface UsersAddAction{
    type: typeof USER_ADD
    payload: User
}
interface UsersDeleteAction{
    type: typeof USER_DELETE
    payload: string
}



export type UsersActions =
    UsersLoadingAction
    | UsersSuccessAction
    | UsersStopAction
    | UsersFailAction
    | UsersUpdateAction
    | UsersAddAction
    | UsersDeleteAction;