import CommentItem from "./CommentItem";
import API from "../api/api";

export default function CommentTree({ comments, postId, reload }) {

  const sendReply = async (parentId, text) => {
    await API.post("comments/", {
      content: text,
      post: postId,
      parent: parentId
    });

    reload();
  };

  return (
    <div className="mt-4">
      {comments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          onReply={sendReply}
        />
      ))}
    </div>
  );
}
