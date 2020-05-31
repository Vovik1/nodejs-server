import React, { useState } from "react";
import { Button, Form, Header, Statistic } from "semantic-ui-react";
import { getLecture, postComment } from "../../api/comments-api";
import { Comment } from "./Lecture";

export default function CommentForm(props: {
  lectureId: string;
  onPostComment: (comment: Comment) => any;
}) {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const lectionComment = async () => {
    const { lectureId, onPostComment } = props;
    setComment("");
    setLoading(true);
    const savedComment: Comment = await postComment(lectureId, {
      rating: 3,
      messageText: comment,
    });
    setLoading(false);
    onPostComment(savedComment);
  };

  return (
    <Form reply>
      <h3> {loading && "Sending..."}</h3>
      <textarea
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      ></textarea>
      <Button
        content="Add Reply"
        onClick={lectionComment}
        labelPosition="left"
        icon="edit"
        primary
      />
    </Form>
  );
}
