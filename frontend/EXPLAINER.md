# Playto Engineering Challenge – Explainer

---

## 🌳 Nested Comment Tree

### Modeling Approach
Nested comments are implemented using a self-referencing foreign key in the Comment model.

### How It Works
- Top-level comments have `parent = NULL`
- Replies reference another comment
- Replies are accessed using `replies` relationship

### Performance
- `select_related("author")` is used to reduce extra database queries
- Replies are serialized recursively to build the comment tree efficiently

---

## 🧮 Leaderboard (Last 24 Hours Only)

### Design Choice
Karma is tracked using a transaction-based model instead of storing totals on the user.


### Why This Approach
- Ensures leaderboard is always real-time
- Avoids storing redundant daily karma values
- Fully meets assignment constraints

---

## ⚙️ Concurrency Handling

Double-like prevention is implemented using database transactions.


- Unique constraints prevent duplicate likes
- `IntegrityError` is handled safely

---

## 🤖 AI Audit

### Initial AI Suggestion
AI recommended storing daily karma directly on the user model.

### Issue
- Violated assignment rules
- Risked inconsistent data

### Final Fix
Replaced with transaction-based aggregation which ensures accuracy and scalability.

---

## ✅ Summary

The system supports:

- Threaded nested discussions
- Real-time leaderboard calculation
- Concurrency-safe like system
- Optimized database queries
