import React, {useState, useEffect} from 'react';
import styles from './WebinarsList.module.css';
import CardItem from "./CardItem";
import {Card} from "semantic-ui-react";
import socketIoClient from 'socket.io-client';
import {BASE_URL} from "../../config";

const socket = socketIoClient(BASE_URL || 'http://localhost:3030');

interface WebinarItem{
    webinarName:string;
    usersOnline: number;
    id: string;
    firstName: string;
    surName: string;
    activeUsers: [];
}

export default function () {

    const [webinarsList, setWebinarsList] = useState();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        socket.emit('get_all_webinars', '');

        socket.on('get_all_webinars', (webinars:WebinarItem[]) => {
            setWebinarsList(renderWebinars(webinars));
            setLoading(false);
        });

    }, []);

    const renderWebinars = (webList:WebinarItem[]) => {

        return webList.map((el:WebinarItem) => {
            return <CardItem item={
                {
                    webinarName: el.webinarName,
                    usersOnline: el.usersOnline,
                    firstName: el.firstName,
                    surName: el.surName,
                    id: el.id
                }
            } key={el.id}/>
        })
    }

    if (loading === true) {
        return (
            <div className={styles.container}>
                Loading...
            </div>
        )
    } else {
        return (
            <div className={styles.mainContainer}>
                <h1 className={styles.mainTitle}>All available webinars</h1>
                <Card className={styles.wrapperCards}>
                    <div className="ui link three cards">
                        {webinarsList}
                    </div>
                </Card>
            </div>
        )
    }

}

export {socket};