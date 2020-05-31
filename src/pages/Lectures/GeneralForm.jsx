import React from "react";
import { Button, Form } from "semantic-ui-react";
import { Formik } from 'formik';
import FileLoaderProgress from './FileLoaderProgress';
import classes from './CreatePage.module.css';
import * as Yup from 'yup';

const GeneralForm = ({initialValues, formSubmiting, closeDetails, editPage}) => {

    const validationSchema = Yup.object().shape({
        title: Yup.string()
          .min(2, "Must have a character")
          .max(255, "Must be shorter than 255")
          .required("Must be a title"),
        description: Yup.string()
          .max(255, "Must be shorter than 255")
          .required("Must add description"),
        videoUrl: Yup.string()
          .required("Please add video URL or upload your own")
      })
      
      const errorFormHandlind = (touchedName, errorName) =>{
        if (touchedName && typeof(errorName) !== 'undefined'){
          return { 
            content: errorName, 
            pointing: 'below' 
          }
        } else {
          return false;
        }
      }

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            border: '1px solid lightgray',
            padding: '20px',
            margin: '0 auto'}} >
            <Formik initialValues= {initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    formSubmiting(values)
                    setSubmitting(true);
                    resetForm();
                    setSubmitting(false);
                }}>
                {({ values, errors, touched, handleSubmit, handleBlur,
                    handleChange, isValid, setFieldValue }) =>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            name="title"
                            id="title"
                            label='Title'
                            placeholder='Title'
                            value={values.title}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errorFormHandlind(touched.title, errors.title)} />
                        <Form.TextArea
                            name="description"
                            id="description"
                            label='Description'
                            placeholder='Description...'
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errorFormHandlind(touched.description, errors.description)} />
                        <Form.Input
                            name="videoUrl"
                            id="videoUrl"
                            label='Add video url'
                            placeholder='videoUrl'
                            value={values.videoUrl}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={errorFormHandlind(touched.videoUrl, errors.videoUrl)} />
                        <label htmlFor="file" className={classes.button}>Upload Video</label>
                        <Form.Input id="file" name="file" type="file" onChange={(event) => {
                            setFieldValue("file", event.currentTarget.files[0]);
                        }} />
                        <FileLoaderProgress file={values.file} onUploaded={(url) => {
                            setFieldValue('videoUrl', url);
                        }} />
                        <div>
                            {editPage &&
                                <div>
                                    <Button type="submit" disabled={!isValid} color='teal'>Save Changes</Button>
                                    <Button type="button" color='red' inverted onClick={closeDetails}>Cancel</Button> 
                                </div>
                            }
                            {!editPage &&
                                <Button type="submit" disabled={!isValid} color='teal'>Add Lecture</Button>
                            }
                        </div>
                    </Form>
                }
            </Formik>
        </div>
    )
}

export default GeneralForm;