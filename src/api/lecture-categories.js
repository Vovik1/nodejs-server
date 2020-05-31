import axios from "axios";
import {BASE_URL} from "../config";

export const getCategory = (id) => {
    const token = localStorage.getItem("Access-Token");
    return axios
        .get(`${BASE_URL}/api/bycategory/${id}`, {
            headers: {
                "Access-Token":token
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })
};
