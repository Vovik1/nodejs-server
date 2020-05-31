import React, {useEffect, useState, Fragment} from 'react';
import {RootState} from "../../../store";
import {connect, ConnectedProps} from "react-redux";
import {getUsers} from "../../../store/actions/getUsers";
import UserDetails from "./UserDetails";
import UsersList from "./UsersList";

const mapStateToProps = (state: RootState) => ({
    usersList: state.users.users,
    usersLoading: state.users.loading
});
const mapDispatchToProps = (dispatch: Function) => ({
    getUsers: () => dispatch(getUsers())
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const Users = ({getUsers, usersList, usersLoading}: PropsFromRedux) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    const handleCloseDetails = () => setOpenDetails(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);
    return (
        <Fragment>
            {usersLoading && <h1 className="loading">Loading...</h1>}
            {!openDetails && (!usersLoading &&  usersList) && <UsersList
                usersList={usersList}
                handleOpenDetails={setOpenDetails}
                handleSetUser={setEditedUser}
            />}
            {openDetails && <UserDetails
                editedUser={editedUser}
                closeDetails={handleCloseDetails}/>}
        </Fragment>
    )
};

export default connector(Users);

