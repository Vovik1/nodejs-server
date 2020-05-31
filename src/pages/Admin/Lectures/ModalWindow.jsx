import React from 'react';
import {Modal, Button} from "semantic-ui-react";
import http from '../../../api/http';
import { deleteLecture } from '../../../api/lectures-api';

const ModalWindow = ({ modalState, dimmer, onClose, id }) => {

    const deleteLecture = async(id) =>{
        const response = await http.remove(`/api/lectures/${id}`);
        onClose();
    }

    return (
        <Modal dimmer={dimmer} open={modalState} onClose={onClose}>
            <Modal.Header>Delete this lecture?</Modal.Header>
            <Modal.Actions>
                <Button color='black' onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    negative
                    icon='checkmark'
                    labelPosition='right'
                    content="Delete"
                    onClick={() => deleteLecture(id)}/>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalWindow