import React from 'react';
import {Image, List} from 'semantic-ui-react';
import {User} from "./Interfaces";
import styles from "./Webinar.module.css";

interface Props{
    user: User
}

export default function ({user}: Props) {
    const {id, userName, imageUrl} = user;
    return (
        <List.Item className={styles.oneUser}>
            <Image avatar src={imageUrl}/>
            <List.Content>
                <List.Header>{userName}</List.Header>
            </List.Content>
        </List.Item>
    )
}