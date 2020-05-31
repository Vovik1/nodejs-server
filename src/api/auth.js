import axios from "axios";
import {BASE_URL} from "../config";

export const signUp = (credential) => {
    return axios.post(`${BASE_URL}/api/user/signup`, credential);
};

export const signIn = (credential)=>{
    return axios.post(`${BASE_URL}/api/user/signin`, credential)
};
