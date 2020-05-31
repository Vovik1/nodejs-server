import React, {useEffect, useState} from 'react';
import styles from './Webinar.module.css';
//import {socket} from "../../App";
import RenderComments from "./RenderComments";
import {Comment} from "semantic-ui-react";
import {socket} from "./Webinar";

export interface CommentI{
    id: string;
    commentText: string;
    author: string;
    authorId: string;
    date: string;
    userImage: string;
}

interface allComments {
    socketId: string
}

export default function () {
    const [comments, setComments] = useState<CommentI[]>([]);

    useEffect(() => {

        socket.on('receive_all_comments', (data: allComments) => {
            socket.emit('send_all_comments', {
                to: data.socketId,
                comments
            });
        });

        socket.on('new_comment', addNewComment);

    });

    const addNewComment = (comment: CommentI) => {
        setComments(prevComments => {
            if (!prevComments.find(item => item.id === comment.id)) {
                return [...prevComments, comment];
            }
            return prevComments;
        });
    };

    return (
        <div className={styles.videoChatContainer}>
            <h2 className={styles.commentsTitle}>
                All comments
            </h2>
            <div className={styles.commentsVideoBlock}>
                <div className={styles.comments}>
                    <Comment.Group>
                        <RenderComments comments={comments}/>
                    </Comment.Group>
                </div>
            </div>
        </div>
    )
}