import React, {useState, useEffect} from 'react';
import {Button, Form, Input} from "semantic-ui-react";
import styles from "./Webinars.module.css";
import {CommentI} from "../Webinar/Comments";
import {checkUserImage} from "./Webinars";
import {socket} from "./Webinars";


export default function(props:{
    creator:string,
    onPostComment: (comment: CommentI) => any;
}){

    const [comment, setComment] = useState<string>('');

    const sendComment = () => {
        const userStr = localStorage.getItem('User') as string;
        const {_id, name, surName, imageUrl} = JSON.parse(userStr);

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yy = today.getFullYear();
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');

        const message:CommentI = {
            id: generateId(),
            commentText: comment,
            author: name + ' ' + surName,
            authorId: _id,
            userImage: checkUserImage(imageUrl),
            date: String(`${yy}-${mm}-${dd} / ${hh}:${min}`)
        };

        socket.emit('new_comment', props.creator, message);
        setComment('');
        message.author = 'Me';
        props.onPostComment(message);
    }

    const generateId = ():string => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    const changeText = (event: React.FormEvent<HTMLTextAreaElement>) => {
        setComment(event.currentTarget.value)
    }


    return(
        <Form className={styles.commentsForm}>
            <Form.TextArea
                id={styles.commentArea}
                value={comment}
                placeholder="Enter your comment"
                onChange={event => changeText(event)}
            />
            <Button
                content="Add comment"
                onClick={sendComment}
                labelPosition="left"
                icon="edit"
                disabled={!comment}
                positive
            />
        </Form>
    )
}
