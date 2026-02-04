import { useEffect, useState } from "react";
import API from "../api/api";
import PostCard from "../components/PostCard";
import Leaderboard from "../components/Leaderboard";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("posts/").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">

        {/* Feed */}
        <div className="col-span-2 space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Sidebar */}
        <Leaderboard />

      </div>
    </div>
  );
}
