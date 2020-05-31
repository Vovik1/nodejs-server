import {CATEGORIES_LOADING, CATEGORIES_SUCCESS, CATEGORIES_FAIL, CATEGORIES_STOP} from "../../types/categories";
import {CategoriesActions, CategoriesState} from "./types";

const initialState: CategoriesState = {
    loading: false,
    categories: []
};

export default function (state = initialState, action: CategoriesActions): CategoriesState {
    switch (action.type) {
        case CATEGORIES_LOADING:
            return {
                ...state,
                loading: true
            };
        case CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload
            };
        case CATEGORIES_STOP:
            return{
                ...state,
                loading: false
            };
        case CATEGORIES_FAIL:
            return{
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
