import {USER_ADD, USERS_LOADING, USERS_STOP} from "../types/users";
import {AppThunk} from "../index";
import User from "../../models/user";
import {addUserInfo} from "../../api/users";

export const addUser = (user: User):AppThunk => (dispatch) => {
    dispatch({type: USERS_LOADING});
    addUserInfo(user).then((response) => {
        dispatch({type: USER_ADD, payload: response.user});
    }).finally(() => {
        dispatch({type: USERS_STOP})
    })
};