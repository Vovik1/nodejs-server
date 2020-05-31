import axios from "axios";
import {BASE_URL} from "../config";

export const readCategories = () => {
    return axios
        .get(`${BASE_URL}/api/categories/all`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};

//замінити на http service
