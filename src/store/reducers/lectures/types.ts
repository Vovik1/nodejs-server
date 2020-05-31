import {LECTURES_LOADING, LECTURES_SUCCESS, LECTURES_FAIL, LECTURES_STOP} from "../../types/lectures";
import Lecture from "../../../models/lecture";

export interface LecturesState {
    loading: boolean,
    lectures: Lecture[]
}

interface LecturesLoadingAction {
    type: typeof LECTURES_LOADING
}

interface LecturesSuccessAction {
    type: typeof LECTURES_SUCCESS
    payload: Lecture[]
}

interface LecturesStopAction {
    type: typeof LECTURES_STOP
}

interface LecturesFailAction {
    type: typeof LECTURES_FAIL
}


export type LecturesActions =
    LecturesLoadingAction
    | LecturesSuccessAction
    | LecturesStopAction
    | LecturesFailAction;
