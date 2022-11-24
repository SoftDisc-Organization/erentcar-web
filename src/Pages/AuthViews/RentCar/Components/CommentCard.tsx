import Comment from "../../../../Models/Comment";

interface CommentProps {
  comment: Comment;
}

export const CommentCard = (props: CommentProps) => {
  return (
    <div className="flex border-1 border-[#C4C4C4] border-box p-3 border-2 border-[#C4C4C4] rounded-lg mb-2">
      <p className="w-full">{props.comment.comment}</p>
      <span className="ml-4">
        {new Date(props.comment.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};

export default CommentCard;
