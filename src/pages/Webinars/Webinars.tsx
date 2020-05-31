import React, {useState, useEffect} from 'react';
import styles from './Webinars.module.css';
import {Comment, Header, Card} from "semantic-ui-react";
import {RTC_CONFIG} from "../../config";
import CommentForm from "./CommentForm";
import RenderComments from "../Webinar/RenderComments";
import {CommentI} from "../Webinar/Comments";
import {Candidate} from "../Webinar/Interfaces";
import defaultUserImage from "../../assets/images/user.png";
import WebinarStopped from "./WebinarStopped";
import socketIoClient from 'socket.io-client';
import {BASE_URL} from "../../config";

const {RTCPeerConnection, RTCSessionDescription} = window;

let socket = socketIoClient(BASE_URL || 'http://localhost:3030');

interface OfferResponse {
    offer: any,
    socket: string
}

export default function (props: any) {

    const peerConnection = new RTCPeerConnection(RTC_CONFIG);

    const [comments, setComments] = useState<CommentI[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    peerConnection.ontrack = (event: RTCTrackEvent) => {
        const remoteVideo = document.getElementById("remote-video") as HTMLVideoElement;
        if (remoteVideo) {
            remoteVideo.srcObject = event.streams[0];
            remoteVideo.onloadedmetadata = e => {
                remoteVideo.play();
            };
        }
    };

    useEffect(() => {

        socket = socketIoClient(BASE_URL || 'http://localhost:3030');

        const {match} = props;

        const userStr = localStorage.getItem('User') as string;
        const {_id, name, surName, imageUrl} = JSON.parse(userStr);

        socket.emit('new_user_joined', {
            lectureId: match.params.id,
            userId: _id,
            userName: `${name} ${surName}`,
            imageUrl: checkUserImage(imageUrl)
        });

        socket.on("candidate", (id: string, candidate: Candidate) => {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch(e => console.error(e));
        });

        socket.on('offer-made', async (data: OfferResponse) => {
            await peerConnection.setRemoteDescription(
                new RTCSessionDescription(data.offer)
            );

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

            socket.emit("make-answer", {
                answer,
                to: data.socket
            });
        });

        socket.on('new_comment', (comment: CommentI) => {
            if (comment.authorId === _id) {
                comment.author = 'Me';
            }
            addNewComment(comment);
        });

        socket.on("get_all_comments", (allComments: CommentI[]) => {
            allComments.filter(item => {
                if (item.authorId === _id) {
                    item.author = 'Me';
                }
            });
            setComments(allComments);
        });

        socket.on('webinar_stoped', () => {
            setOpenModal(true);
        });

        window.addEventListener('beforeunload', () => {
            peerConnection.close();
            socket.emit('disconnect_user', {
                userId: _id,
                lectureId: match.params.id
            });
            socket.close();
        })

        return () => {

            window.removeEventListener('beforeunload', () => {
                peerConnection.close();
                socket.emit('disconnect_user', {
                    userId: _id,
                    lectureId: match.params.id
                });
                socket.close();
            })

            peerConnection.close();
            socket.emit('disconnect_user', {
                userId: _id,
                lectureId: match.params.id
            });
            socket.close();
        };

    }, comments);

    const addNewComment = (comment: CommentI) => {
        setComments(prevComments => {
            if (!prevComments.find(item => item.id === comment.id)) {
                return [...prevComments, comment];
            }
            return prevComments;
        });
    };

    return (
        openModal === true
            ? <WebinarStopped/>
            : <div id='video' className={styles.videoContainer}>
                <video autoPlay muted id='remote-video' className={styles.remoteVideo}></video>
                <Comment.Group className={styles.commentsGroup}>
                    <Header as="h3" dividing className={styles.commentTitle}>
                        Comments
                    </Header>
                    <div id={styles.commentCard}>
                        <RenderComments comments={comments}/>
                    </div>
                    <CommentForm creator={props.match.params.id} onPostComment={addNewComment}/>
                </Comment.Group>
            </div>
    )
}

export const checkUserImage = (img: string) => {
    if (img == undefined || img.length == 0) {
        return defaultUserImage;
    } else {
        return img;
    }
}

export {socket};