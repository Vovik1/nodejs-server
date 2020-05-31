import axios from "axios";
import { BASE_URL } from '../config'

const get =  async (url, data, options = {}) => {
    const token = localStorage.getItem("Access-Token");
    return axios.get(BASE_URL+url , {...options, headers: {'Access-Token': token}, params:data})
}

const post = async (url, data, options = {}) => {
    const token = localStorage.getItem("Access-Token");
    return axios.post(BASE_URL+url, data, {...options, headers: {'Access-Token': token}})
}

const put = async (url, data, options = {}) => {
    const token = localStorage.getItem("Access-Token");
    return axios.put(BASE_URL+url, data, {...options, headers: {'Access-Token': token}})
}

// const remove = async (url = {}) => {
//     const token = localStorage.getItem("Access-Token");
//     return axios.delete(BASE_URL+url, {headers: {'Access-Token': token}});
// }


// export default { get, put, post, delete: remove};

const remove = async (url, data=null) => {
    const token = localStorage.getItem("Access-Token");
    return axios.delete(BASE_URL+url, {
        headers: {
            'Access-Token': token
        },
    data:data
    });
}

export default {get, put, post, remove};

