import { useEffect, useState } from "react";
import API from "../api/api";
import CommentTree from "./CommentTree";

import { useCallback } from "react";


export default function PostCard({ post }) {

  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

const loadComments = useCallback(async () => {
    const res = await API.get(`comments/${post.id}/`);
    setComments(res.data);
}, [post.id]);


useEffect(() => {
  loadComments();
}, [loadComments]);


  const likePost = async () => {
    await API.post(`like-post/${post.id}/`);
  };

  const addComment = async () => {
    await API.post("comments/", {
      content: text,
      post: post.id,
      parent: null
    });

    setText("");
    loadComments();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">

      {/* Author */}
      <h3 className="font-semibold text-gray-600">
        @{post.author}
      </h3>

      {/* Content */}
      <p className="mt-3 text-lg text-gray-800">
        {post.content}
      </p>

      {/* Like */}
      <button
        onClick={likePost}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
      >
        👍 Like
      </button>

      {/* Comment Input */}
      <div className="mt-5">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="border rounded w-full p-2"
        />

        <button
          onClick={addComment}
          className="bg-gray-800 text-white px-3 py-1 mt-2 rounded"
        >
          Comment
        </button>
      </div>

      {/* Comments */}
      <CommentTree
        comments={comments}
        postId={post.id}
        reload={loadComments}
      />

    </div>
  );
}
