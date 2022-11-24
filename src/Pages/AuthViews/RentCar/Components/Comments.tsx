import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import Comment from "../../../../Models/Comment";
import CreateComment from "../../../../Models/CreateComment";
import CommentCard from "./CommentCard";

interface CommentsProps {
  comments: Comment[];
  createComment: (comment: CreateComment) => void;
}

export const Comments = (props: CommentsProps) => {
  const [comment, setComment] = useState({ comment: "" } as CreateComment);

  const handleComment = (e: any) => {
    setComment({ ...comment, comment: e.target.value });
  };

  const handleSubmit = () => {
    props.createComment(comment);
    setComment({ comment: "" });
  }

  return (
    <div className="mt-5 border-t-2 border-[#C4C4C4] border-box py-3">
      <h1 className="text-3xl">Comentarios</h1>
      <div className="mt-5">
        <h2 className="font-bold text-xl">Realiza un comentario</h2>
        <div className="flex mt-3">
          <InputText
            className="w-full"
            placeholder="Ingresa un comentario"
            value={comment.comment}
            onChange={handleComment}
          />
          <Button
            className="btn-primary w-[150px] !ml-2"
            label="Comentar"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-xl mb-3">Últimos comentarios</h2>
        <div className="flex flex-col">
          {props.comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
