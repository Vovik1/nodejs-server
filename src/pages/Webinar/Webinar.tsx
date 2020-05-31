import React from 'react';
import styles from './Webinar.module.css';
import StartWebinar from "./StartWebinar";
import socketIoClient from "socket.io-client";
import {BASE_URL} from "../../config";

const socket = socketIoClient(BASE_URL || 'http://localhost:3030');

export default function () {
    return (
        <div className={styles.container}>
            <StartWebinar/>
        </div>
    )
}

export {socket};