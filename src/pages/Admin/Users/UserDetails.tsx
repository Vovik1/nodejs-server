import React, {useState} from 'react';
import {Button, Form, FormProps, InputOnChangeData} from "semantic-ui-react";
import User from "../../../models/user";
import {updateUser} from "../../../store/actions/updateUser";
import {connect, ConnectedProps} from "react-redux";
import {addUser} from "../../../store/actions/addUser";

const mapDispatchToProps = (dispatch: Function) => ({
    updateUser: (user: User) => dispatch(updateUser(user)),
    addUser: (user: User) => dispatch(addUser(user))
});
const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface UserDetailsProps extends PropsFromRedux {
    closeDetails: any //Todo,
    editedUser: null | User,
}

const UserDetails = ({closeDetails, editedUser = null, updateUser, addUser}: UserDetailsProps) => {
    if (!editedUser) {
        editedUser = {
            id: '',
            name: '',
            email: '',
            surName: '',
            role: '',
            password: '',
            imageUrl: ''
        }
    }
    const [user, setUser] = useState({...editedUser});

    const roles = [{key: 'admin', text: 'Admin', value: 'admin'},
        {key: 'lector', text: 'Lector', value: 'lector'},
        {key: 'student', text: 'Student', value: 'student'},
    ];
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData, key: any) => {
        setUser(Object.assign({}, user, {[key]: data.value}));
    };
    const handleSubmit = (event: React.SyntheticEvent<HTMLElement>, data: FormProps, key: any) => {
        setUser(Object.assign({}, user, {[key]: data.value}));
    };
    const handleUser = () => {
      if(editedUser && !editedUser.id){
          addUser(user);
      }  else{
          updateUser(user);
      }
        closeDetails(true);
    };
    return (
        <div className="userDetails" style={{padding: '30px'}}>
            <Form size='large'>
                <Form.Input
                    label="First Name"
                    placeholder="First Name"
                    value={user.name}
                    onChange={(event, data) => handleChange(event, data, "name")}
                />
                <Form.Input
                    label="Last Name"
                    placeholder="Last Name"
                    value={user.surName}
                    onChange={(event, data) => handleChange(event, data, "surName")}
                />

                <Form.Select
                    fluid
                    label='Role'
                    options={roles}
                    placeholder='Role'
                    value={user.role}
                    onChange={(event, data) => handleSubmit(event, data, "role")}
                />

                <Form.Input
                    label="Email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(event, data) => handleChange(event, data, "email")}
                />

                {!editedUser.id && (
                    <Form.Input
                        label="Password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(event, data) => handleChange(event, data, "password")}
                    />
                )}

                <Form.Field style={{textAlign: 'end', marginTop: '30px'}}>
                    <Button color='red' inverted onClick={closeDetails}>Cancel</Button>
                    <Button type='submit' color='green'
                            onClick={handleUser}
                    >Save</Button>
                </Form.Field>
            </Form>
        </div>
    )
};

export default connector(UserDetails);

