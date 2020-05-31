import axios from "axios";
import {BASE_URL} from "../config";

export const getFavorites = () => {
    const token = localStorage.getItem("Access-Token");
    return axios
        .get(`${BASE_URL}/api/lectures/by_user`, {
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
