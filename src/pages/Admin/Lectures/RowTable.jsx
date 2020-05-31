import React, { useState } from 'react';
import { Table, Button, Checkbox, Label, Icon } from 'semantic-ui-react';
import ModalWindow from './ModalWindow';
import { withRouter } from "react-router-dom";

const RowTable = (props) => {

    const {id, title, videoUrl} = props.lecture; 
    const {handleEditPage, handleOpenDetails} = props;
    const {history} = props;

    const [modalState, setModalState] = useState(false);
    const [dimmer, setDimmer] = useState(true);

    const redirectToSingleLecture = (lectureId) => {
        history.push(`/lecture/${lectureId}`);
    }

    const show = (dimmer) => () => {
        setModalState(true);
        setDimmer(dimmer);
    }
    const close = () => setModalState(false);

    return (
        <Table.Row>
            <ModalWindow dimmer={dimmer} modalState={modalState} onClose={close} id={id} />
            <Table.Cell><Checkbox /></Table.Cell>
            <Table.Cell>{title}</Table.Cell>
            <Table.Cell><Label href={videoUrl}>{videoUrl}</Label></Table.Cell>
            <Table.Cell>
                <Button.Group>
                    <Button onClick={() => redirectToSingleLecture(id)}>
                        <Icon link name='hand point left' color='blue' style={{margin: '0'}} />
                    </Button>
                    <Button.Or />
                    <Button onClick={() => {
                        handleOpenDetails(true)
                        handleEditPage(props.lecture)
                    }}>
                        <Icon link name='pencil alternate' color='teal' style={{margin: '0'}}/>
                    </Button>
                    <Button.Or />
                    <Button onClick={show('blurring')}>
                        <Icon link name='trash alternate' color='red' style={{margin: '0'}} />
                    </Button>

                </Button.Group>
            </Table.Cell>
        </Table.Row>
    )
}

export default withRouter(RowTable);