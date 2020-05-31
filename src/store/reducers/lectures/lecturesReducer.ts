import {LECTURES_LOADING, LECTURES_SUCCESS, LECTURES_FAIL, LECTURES_STOP} from "../../types/lectures";
import {LecturesActions, LecturesState} from "./types";

const initialState: LecturesState = {
    loading: false,
    lectures: []
};

export default function (state = initialState, action: LecturesActions) {
    switch (action.type) {
        case LECTURES_LOADING:
            return {
                ...state,
                loading: true
            };
        case LECTURES_SUCCESS:
            return {
                loading: false,
                lectures: action.payload
            };
        case LECTURES_STOP:
            return {
                ...state,
                loading: false
            };
        case LECTURES_FAIL:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
