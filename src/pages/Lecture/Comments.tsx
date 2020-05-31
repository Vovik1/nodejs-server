import React, { useState, useEffect } from "react";
import { Button, Comment, Form, Header, Statistic } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import { RenderComments } from "./RenderComments";
import "./Lecture.css";
//import { socket } from "../../App";
import { Comment as CommentI } from "./Lecture";
import socketIoClient from 'socket.io-client';
import {BASE_URL} from "../../config";

const socket = socketIoClient(BASE_URL || 'http://localhost:3030');

export default function Comments(props: {
  messages: CommentI[];
  lectureId: string;
}) {
  const [messages, setMessages] = useState<CommentI[]>(props.messages);

  const leave_room = () => {
    socket.emit("Leave room", props.lectureId);
  };

  useEffect(() => {
    socket.emit("join_room", props.lectureId);
    socket.on("send_message", addNewComment);
    window.addEventListener("beforeunload", leave_room);
    return () => {
      window.removeEventListener("beforeunload", leave_room);
    };
  }, []);

  const addNewComment = (comment: CommentI) => {
    setMessages((prevMessages) => {
      if (!prevMessages.find((item) => item._id === comment._id)) {
        return [...prevMessages, comment];
      }
      return prevMessages;
    });
  };

  const { lectureId } = props;

  return (
    <Comment.Group id="commentGroup">
      <Header as="h3" dividing>
        Comments
      </Header>
      <div className="commentCard">
        <RenderComments comments={messages} />
      </div>
      <CommentForm lectureId={lectureId} onPostComment={addNewComment} />
    </Comment.Group>
  );
}
