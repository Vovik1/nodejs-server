import http from './http'

export const createLecture = async(values) => {
    const response = await http.post('/api/lectures', values)
    return response.data;
}

export const deleteLecture = () => {
    
}

export const editLecture = async (id, values) => {
    const response = await http.put(`/api/lectures/${id}`, values)
    return response.data;
}

export const getAllLectures = () => {
    
}



