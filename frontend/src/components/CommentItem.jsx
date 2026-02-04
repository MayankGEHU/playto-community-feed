import { useState } from "react";

export default function CommentItem({ comment, onReply }) {

  const [showReply, setShowReply] = useState(false);
  const [text, setText] = useState("");

  const handleReply = () => {
    onReply(comment.id, text);
    setText("");
    setShowReply(false);
  };

  return (
    <div className="ml-6 mt-4 border-l pl-4">

      <p className="font-medium text-gray-700">
        @{comment.author}
      </p>

      <p className="text-gray-800">{comment.content}</p>

      <button
        onClick={() => setShowReply(!showReply)}
        className="text-blue-500 text-sm"
      >
        Reply
      </button>

      {showReply && (
        <div className="mt-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border rounded p-1 mr-2"
          />
          <button
            onClick={handleReply}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Send
          </button>
        </div>
      )}

      {comment.replies?.map(reply => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} />
      ))}
    </div>
  );
}
