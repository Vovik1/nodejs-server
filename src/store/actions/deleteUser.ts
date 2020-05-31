import {USER_DELETE, USERS_LOADING, USERS_STOP} from "../types/users";
import {AppThunk} from "../index";
import {removeUser} from "../../api/users";

export const deleteUser = (id: string):AppThunk => (dispatch) => {
    dispatch({type: USERS_LOADING});
    removeUser(id).then((response) => {
        dispatch({type: USER_DELETE, payload: response.id});
    }).finally(() => {
        dispatch({type: USERS_STOP})
    })
};