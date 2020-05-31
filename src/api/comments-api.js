import http from './http';

 const getLecture = async (lectureId) => {
    const result = await http.get(`/api/lectures/${lectureId}`);
    return result.data;
  };
  
   const postComment = async(lectureId, comment) => {
    const url = `/api/lectures/${lectureId}/messages`;
      const response = await http.post(url, comment);
      return response.data; 
    };


export {getLecture, postComment};
