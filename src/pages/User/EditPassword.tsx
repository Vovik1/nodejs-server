import React, { useState } from 'react';

import { Form, Button, Message } from 'semantic-ui-react';

import http from "../../api/http";
import User from "../../models/user";

import './User.css';


interface Props {
    user: User
}

const EditPassword: React.FC<Props> =  ({ user }) => {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    })

    const [ error, setError ] = useState(false)
    const [ success, setSuccess ] = useState(false)
    const [ isDisabled, setIsDisabled ] = useState(true)

    const matchPasswords = () => {
        if (passwords.newPassword !== passwords.repeatNewPassword) {
            setError(true)
        } 
    }

    const isValidForm = () => {
        return passwords.oldPassword.length >= 5 && passwords.newPassword.length >= 5 && passwords.repeatNewPassword.length >= 5
    }

    const textInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valid = isValidForm()
        const { name, value } = e.target
        setPasswords( prevState => ({
            ...prevState,
            [name]: value
        }))

        setIsDisabled(!valid)
        setError(false)
        setSuccess(false)
    }

    const getMessage = () => {
        if (error) {
            if (passwords.newPassword !== passwords.repeatNewPassword) {
                return <Message negative header="Your new password does not match confirmation." />
            } else if (passwords.oldPassword == passwords.newPassword) {
                return <Message negative header={"New password can not be the same as old password" }/>
            }
            else { 
                return <Message negative header={"Incorrect current password" }/>
             }
        }
        if (success) {
            return <Message success header="Your password has been changed." />
        }
    }

    const saveFields = () => {
        const data = {
            "oldData": {
                "email": user.email,
                "password": passwords.oldPassword
            },
            "newData": {
                "password": passwords.newPassword
            }
        }

        http.put("/api/edit/editPassword", data )
            .then(response => {
                setSuccess(true)
            })
            .catch(e => 
                setError(true)
            )
    };

    return (
        <div className="edit-profile">
            <div className="edit-content">
                <div className="title-edit">Password</div>
                <div className="description-edit">Change your password here</div>
                <div className="inputs">
                    <Form onSubmit={matchPasswords}> 
                        <Form.Field required>
                            <label>Password:</label>
                            <input 
                                onChange={textInputOnChange} 
                                type="password" 
                                name="oldPassword" 
                                placeholder='Enter current password'
                            />
                        </Form.Field>
                        <Form.Field required>
                            <input 
                                onChange={textInputOnChange} 
                                type="password" 
                                name="newPassword" 
                                placeholder='Enter new password' 
                            />
                        </Form.Field>
                        <Form.Field required>
                            <input 
                                onChange={textInputOnChange} 
                                type="password" 
                                name="repeatNewPassword" 
                                placeholder='Re-type new password' 
                            />
                        </Form.Field>
                        <div className="save-btn">
                            <Button onClick={saveFields} disabled={isDisabled} color="red">Save</Button>
                        </div>
                    </Form>
                </div>
                <div>
                    {getMessage()}
                </div>
            </div>
        </div>
    )
}

export default EditPassword 
