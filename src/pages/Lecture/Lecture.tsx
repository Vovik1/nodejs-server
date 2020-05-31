import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getLecture } from "../../api/comments-api";
import "./Lecture.css";
import Comments from "./Comments";
import { RouteComponentProps } from "react-router-dom";

export interface Lection {
  id: string;
  videoUrl: string;
  description: string;
  title: string;
  messages: Comment[];
}

export interface Comment {
  _id: string;
  messageText: string;
  author: string;
  rating: number;
  createdOn: string;
}

export default function Lecture(props: RouteComponentProps<{id:string}>) {
  const [lecture, setLecture] = useState<Lection>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLecture = async () => {
    const { match } = props;
    getLecture(match.params.id)
      .then((lecture: Lection) => {
        setLecture(lecture);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLecture();
  });

  const lectureId = props.match.params.id;
  if (loading) return <h1 className="loading">Loading...</h1>;
  if (!lecture) return <h1>404 Not Found</h1>;
  return (
    <div>
      <h1 className="comment-title">{lecture.title}</h1>
      <div className="video-container">
        <ReactPlayer
          className="video-item"
          url={lecture.videoUrl}
          width="100%"
          height="450px"
        />
      </div>
      <div className="comment-description">
        This video is about: {lecture.description}
      </div>
      <Comments messages={lecture.messages} lectureId={lectureId} />
    </div>
  );
}
