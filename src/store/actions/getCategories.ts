import {CATEGORIES_FAIL, CATEGORIES_LOADING, CATEGORIES_STOP, CATEGORIES_SUCCESS} from "../types/categories";
import {readCategories} from "../../api/categories";
import {AppThunk} from "../index";

export const getCategories = ():AppThunk => (dispatch) => {
    dispatch({type: CATEGORIES_LOADING});
    return readCategories().then(categories => {
        dispatch({type: CATEGORIES_SUCCESS, payload: categories})
    }).catch(()=>{
        dispatch({type: CATEGORIES_FAIL})
    }).finally(()=>{
        dispatch({type: CATEGORIES_STOP})
    })
};