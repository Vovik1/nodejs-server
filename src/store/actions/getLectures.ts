import {LECTURES_LOADING, LECTURES_SUCCESS, LECTURES_FAIL, LECTURES_STOP} from "../types/lectures";
import {readLectures} from "../../api/lectures";
import {AppThunk} from "../index";

export const getLectures = ():AppThunk => (dispatch) => {
    dispatch({type: LECTURES_LOADING});
    return readLectures().then(lectures => {
        dispatch({type: LECTURES_SUCCESS, payload: lectures})
    }).catch(()=>{
        dispatch({type: LECTURES_FAIL})
    }).finally(()=>{
        dispatch({type: LECTURES_STOP})
    })
};