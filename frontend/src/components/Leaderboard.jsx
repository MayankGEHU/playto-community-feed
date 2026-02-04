import { useEffect, useState } from "react";
import API from "../api/api";

export default function Leaderboard() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("leaderboard/").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 h-fit">

      <h2 className="text-xl font-bold mb-4">
        🏆 Top Users
      </h2>

      {users.map((u, i) => (
        <div key={i} className="flex justify-between border-b py-2">
          <span>@{u.user__username}</span>
          <span className="font-semibold">{u.total_karma}</span>
        </div>
      ))}

    </div>
  );
}
