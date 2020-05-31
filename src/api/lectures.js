import axios from "axios";
import {BASE_URL} from "../config";

export const readLectures = () => {
    return axios
        .get(`${BASE_URL}/api/lectures/all`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};
