import React, {useEffect, useState} from 'react';
import styles from './Webinar.module.css';
import {Button, Input} from "semantic-ui-react";
import UsersAndCamera from './UsersAndCamera';
import Comments from "./Comments";
import {socket} from "./Webinar";

export default function () {

    const [startWebinar, setStartWebinar] = useState(false);
    const [webinarName, setWebinarName] = useState('');

    const showCamera = () => {
        const userStr = localStorage.getItem('User') as string;
        const user = JSON.parse(userStr);

        socket.emit('add_new_webinar', {
            webinarName,
            firstName: user.name,
            surName: user.surName
        });

        setStartWebinar(true);
    }

    const textInputOnchange = (e: {target: HTMLInputElement}) => {
        setWebinarName(e.target.value);
    }

    if (startWebinar === true) {
        return (
            <div className={styles.container}>
                <UsersAndCamera/>
                <Comments/>
            </div>
        )
    } else {
        return (
            <div className={styles.startWebinar}>
                <Input type='text' className={styles.webinarName} placeholder='Webinar name' value={webinarName}
                       onChange={textInputOnchange}/>
                <Button disabled={!webinarName} className="ui teal button" onClick={showCamera}>
                    Start new webinar
                </Button>
            </div>
        )
    }

}