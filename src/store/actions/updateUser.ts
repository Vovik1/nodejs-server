import {USER_UPDATE, USERS_LOADING, USERS_STOP} from "../types/users";
import {updateUserInfo} from "../../api/users";
import {AppThunk} from "../index";
import User from "../../models/user";

export const updateUser = (user: User):AppThunk => (dispatch) => {
    dispatch({type: USERS_LOADING});
    updateUserInfo(user).then((response) => {
        dispatch({type: USER_UPDATE, payload: response.user});
    }).finally(() => {
        dispatch({type: USERS_STOP})
    })
};