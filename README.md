# Playto Community Feed

A full-stack community discussion platform featuring threaded comments, karma gamification, and a real-time leaderboard.

---

## 🚀 Tech Stack

Frontend:
- React
- Tailwind CSS
- Axios

Backend:
- Django
- Django REST Framework

Database:
- SQLite (Development)
- PostgreSQL compatible

---

## Features

### Community Feed
- Create and view text posts
- Displays author and content
- Like system for engagement

### Threaded Comments
- Supports nested replies (Reddit-style)
- Efficient comment tree rendering

### Gamification
- 1 Like on Post = 5 Karma
- 1 Like on Comment = 1 Karma
- Karma tracked via transaction history

### Dynamic Leaderboard
- Displays Top 5 Users
- Only counts karma earned in last 24 hours
- Computed dynamically using aggregation queries

---

## 🛠️ Setup Instructions

### Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/playto-community-feed.git
cd playto-community-feed
