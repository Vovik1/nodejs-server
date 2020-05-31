import React, { useState } from 'react'

import { Button, Image, Form, Message } from 'semantic-ui-react'

import http from "../../api/http";
import AvatarCropper from './AvatarCropper'

import './User.css';


const EditPhoto = (props) => {
    const [ uploadedFile, setUploadedFile ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ cropWindow,  showCropWindow] = useState(false)
    const [ newAvatar, setNewAvatar ] = useState(null)
    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')
    
    const isFileValid = (file) => {
        if (!file) return false

        const validExtentions = ['image/jpg', 'image/png', 'image/jpeg']
        if (!validExtentions.includes(file.type)) {
            setError(`Invalid image type. Allowed: ${validExtentions.join(', ')}`)
            return false
        }
        const maxSize = 15728640
        if (maxSize < file.size) {
            setError('Invalid image size. Allowed < 15 mb')
            return false
        }

        return true 
    }
    
    const singleFileChangedHandler = (event) => {
        setSuccess('')
        
        const reader = new FileReader();
        const file = event.target.files[0];
        const valid = isFileValid(file)
        if (!valid) return 
        setLoading(true)
        
    
        reader.onloadend = () => {
            setUploadedFile(file)
            setNewAvatar(reader.result)
            setError('')
            showCropWindow(true) 
            setLoading(false)
        }
        reader.readAsDataURL(file)
    };

    const cropImage = (file) => {
        setUploadedFile(file)
        showCropWindow(false)
    }

    const getMessage = () => {
        if (error) {
            return <Message negative header={error} />
             
        }
        if (success) {
            return <Message success header={success} />
        }
    }

    const singleFileUploadHandler = () => {
        setLoading(true) 
        const data = new FormData();
    
        if (uploadedFile) {
            const requestOptions = {
                headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}` },
                crossDomain: true
            }
            
            data.append('avatarImage', uploadedFile, uploadedFile.name);
            http.post('/api/aws/upload-avatar', data, requestOptions)
                .then( response => {
                    setLoading(false)
                    setError('')
                    setSuccess('Avatar has successfully updated')
                    
                    const avatar = response.data.updatedUser.imageUrl
                    props.setAvatar(avatar)
                    console.log(response.data)
                        // todo test non-200  
                })
                .catch( error => {
                    setLoading(false)
                    setError('Something went wrong. Please, try again!')
                    setSuccess('')
                })
        }
    }

    return (
        <>
            <Form loading={loading}>
                <div className="edit-profile">
                    <div className="edit-content">
                        <div className="title-edit">Photo</div>
                        <div className="description-edit">Add a nice photo of yourself for your profile.</div>
                        <div className="imgPreview">
                            <Image src={newAvatar || props.avatar} />  
                        </div>
                        <div>
                            {getMessage()}
                        </div>
                        {cropWindow && <AvatarCropper avatar={newAvatar} setNewAvatar={setNewAvatar} cropImage={cropImage}/>}
                        <input type="file" id="file" onChange={singleFileChangedHandler} />
                        <label htmlFor="file">Upload image</label>
                        <Button className="save-btn" onClick={singleFileUploadHandler} disabled={!!error} color="red">Save</Button>
                    </div>
                </div>
            </Form>
        </>
    );
    
}

export default EditPhoto
