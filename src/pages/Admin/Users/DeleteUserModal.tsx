import React from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

const DeleteUserModal = ({user, config}:any) => {
    return (
        <Modal open={config.modalOpen}
               onClose={config.handleClose}>
            <Header icon='trash alternate' content='Delete user'/>
            <Modal.Content>
                <p>
                    Are you sure you want to permanently delete this user?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' inverted onClick={config.handleClose}>
                    <Icon name='remove'/> No
                </Button>
                <Button color='green' inverted onClick={() => {
                    config.handleRemove(user.id)
                }}>
                    <Icon name='checkmark'/> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
};

export default DeleteUserModal;