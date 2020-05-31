import {CATEGORIES_LOADING, CATEGORIES_SUCCESS, CATEGORIES_FAIL, CATEGORIES_STOP} from "../../types/categories";
import Category from "../../../models/category";

export interface CategoriesState {
    loading: boolean,
    categories: Category[]
}

interface CategoriesLoadingAction {
    type: typeof CATEGORIES_LOADING
}

interface CategoriesSuccessAction {
    type: typeof CATEGORIES_SUCCESS
    payload: Category[]
}

interface CategoriesStopAction {
    type: typeof CATEGORIES_STOP
}

interface CategoriesFailAction {
    type: typeof CATEGORIES_FAIL
}


export type CategoriesActions =
    CategoriesLoadingAction
    | CategoriesSuccessAction
    | CategoriesStopAction
    | CategoriesFailAction;