import React from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {useHistory} from "react-router-dom";

export default function () {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/webinars/list`);
    }

    return (
        <Modal
            open={true}
            size='small'
        >
            <Modal.Header>Alert</Modal.Header>
            <Modal.Content>
                <p>The webinar has been ended. Thanks for watching. In order to continue click on button "Continue"</p>
            </Modal.Content>
            <Modal.Actions>
                <Button icon='check' content='Continue' positive onClick={handleClick}/>
            </Modal.Actions>
        </Modal>
    )
}