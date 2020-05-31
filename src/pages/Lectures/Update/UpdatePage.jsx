import React from "react";
import {editLecture} from '../../../api/lectures-api';
import { withRouter } from "react-router-dom";
import GeneralForm from '../GeneralForm';



const UpdatePage = ({history, closeDetails, editPage}) => {

  const initialValues = {
    title: editPage.title,
    description: editPage.description,
    videoUrl: editPage.videoUrl,
    file:null
  }
  
  const onUpdateLecture = async (values) => {
    const result = await editLecture(editPage.id, values);
    history.push(`/lecture/${editPage.id}`);
  }

  return <GeneralForm 
    formSubmiting={onUpdateLecture} 
    initialValues={initialValues} 
    closeDetails={closeDetails}
    editPage={editPage} />
  
}

export default withRouter(UpdatePage);