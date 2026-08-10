Real-Time Chat Application

Overview

This repository contains a real-time chat application with a React + Vite frontend and a Node.js + Express backend. Real-time messaging is powered by Socket.IO and messages are persisted in MongoDB via Mongoose.

Features

- Send messages
- Receive messages instantly (Socket.IO real-time broadcasting)
- Chat history persisted and available after refresh
- Message timestamps
- Connection / disconnection status
- REST API for message access
- MongoDB persistence via Mongoose
- Input validation and basic error handling (server-side)
- Responsive, minimal UI

Tech Stack

Frontend
- React
- Vite
- Axios
- socket.io-client
- CSS

Backend
- Node.js
- Express
- Socket.IO
- Mongoose
- MongoDB

Project Structure

Repository root
├── client/        # React frontend (Vite)
│   ├── public/
│   ├── src/
│   └── package.json
├── server/        # Node.js + Express backend
│   ├── src/
│   └── package.json
└── README.md

Local Prerequisites

- Node.js and npm
- Git
- MongoDB or MongoDB Atlas (for production)

Installation

Clone the repository and install dependencies for each package:

```bash
git clone https://github.com/shivam-r1/Chat_app_assignment.git
cd Chat_app_assignment

# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

Environment Variables

Provide these variables using placeholders (do NOT put secrets in the repo).

Frontend (build-time)
- `VITE_API_URL` — base API URL used by the frontend; should include the `/api` prefix if the frontend expects it (e.g. `https://api.example.com/api`).
- `VITE_SOCKET_URL` — backend origin for Socket.IO (e.g. `https://api.example.com`).

Backend (runtime)
- `MONGODB_URI` — MongoDB connection string (Atlas or self-hosted). Format: `mongodb+srv://<user>:<password>@<cluster>/<dbname>?<options>` or `mongodb://<host>:<port>/<dbname>`.
- `CLIENT_URL` — exact frontend origin allowed by CORS (protocol + host, e.g. `https://chat-app-frontend-gyje.onrender.com`).
- `PORT` — optional; the server uses `process.env.PORT || 5000`.

Running Locally

Backend (production start)
```bash
cd server
npm start
```

Frontend (development)
```bash
cd client
npm run dev
```

By default, local example env files use `http://localhost` values (see `.env.example` files). For production builds, set the `VITE_*` variables in your build environment.

API Documentation

- `GET /api/health` — returns basic service health `{ status: 'ok' }`.
- `GET /api/messages` — returns stored messages. Query params supported: `room` (string) and `limit` (number). Response shape: `{ messages: [ { _id, username, message, room, createdAt } ] }`.
- `POST /api/messages` — create a message. Expected JSON body (example):

```json
{
  "username": "string",
  "message": "string",
  "room": "string" // optional, default used by server if applicable
}
```

Validation: the backend performs basic validation and returns appropriate error messages for invalid or empty inputs.

Socket.IO Events

- `connection` / `disconnect` — standard lifecycle events.
- `join_room` — client requests to join a room; the server adds the socket to the room and tracks room membership server-side. The server emits `user_joined`/`user_left` events with an `onlineUsers` list, but the frontend does not currently display a presence list.
- `send_message` — client emits to send a message; server persists and broadcasts `new_message`.
- `new_message` — server broadcasts newly persisted messages to room participants.
- `error_message` — server emits on socket-level errors.
- `typing` / `stop_typing` — client events to signal typing state; the server forwards typing notifications to other sockets as `user_typing`. Note: the frontend includes a `TypingIndicator` component but it is not currently wired to socket events; typing UI is incomplete.

Refer to `client/src/services/socket.js`, `client/src/hooks/useSocket.js`, and `server/src/sockets` for implementation details.

Architecture / Data Flow

1. Frontend loads historical messages via `GET /api/messages` (REST) on page load.
2. For real-time messaging, frontend connects to backend via Socket.IO using `VITE_SOCKET_URL`.
3. When a client emits `send_message`, the backend persists the message to MongoDB and broadcasts `new_message` to connected clients.
4. Refreshing the page re-fetches history from the REST API.

Design Decisions

- REST API is used to fetch persisted history and provide a stable retrieval endpoint.
- Socket.IO is used for low-latency real-time message delivery. The server maintains basic room membership state and emits join/leave events, but the frontend only displays the current connection status.
- MongoDB (Atlas) is used for persistence via Mongoose models.
- Environment variables control runtime and build-time configuration for portability.
- Server-side validation is performed to prevent empty or invalid messages.

Error Handling

- Invalid/empty message payloads return HTTP error responses and socket errors are emitted as `error_message` events.
- Connection and disconnection are surfaced to the client via socket events and UI state.
- Server logs DB connection failures; the service attempts to start even if DB connection fails (see server configuration).

Deployment

Live Frontend: https://chat-app-frontend-gyje.onrender.com

Live Backend: https://chat-app-backend-d1bq.onrender.com

Deployment notes:
- Frontend is deployed as a static site (Vite `dist`) and requires `VITE_API_URL` and `VITE_SOCKET_URL` at build time.
- Backend is deployed as a Web Service; set `MONGODB_URI` and `CLIENT_URL` in the service environment.
- Socket.IO and Express share the same HTTP server; ensure WebSockets are supported.

Production Environment Configuration

- Frontend: `VITE_API_URL` → backend `/api` routes; `VITE_SOCKET_URL` → backend origin.
- Backend: `CLIENT_URL` → frontend origin for CORS; `MONGODB_URI` → MongoDB Atlas.

Testing / Verification

Production (verified):
- `GET /api/health` (health endpoint)
- REST `GET /api/messages`
- REST `POST /api/messages`
- MongoDB persistence (messages stored in production)
- Two-browser real-time messaging via Socket.IO
- Refresh persistence (history loads after reload)
- Frontend production build succeeded and no red console errors observed in production
- CORS and Socket.IO connectivity in production

Local (verified):
- Disconnect / reconnect behavior
- Empty input validation and server-side validation errors
- Edge-case and error handling behavior observed during local testing

Assumptions

- This demo uses a username-based identity without full authentication (no auth provider).
- The current UI uses the `general` room by default; the backend supports a `room` parameter.
- Intended for assignment/demo purposes.

Future Improvements

- Add authentication and per-user identity.
- Support multiple named chat rooms.
- Add typing indicators and online presence UI (if not yet implemented).
- Add production monitoring and graceful startup on DB failure.

Submission

Live Application: https://chat-app-frontend-gyje.onrender.com

Backend API: https://chat-app-backend-d1bq.onrender.com

Repository: https://github.com/shivam-r1/Chat_app_assignment

Screen Recording: [Google Drive Screen Recording](PASTE_LINK_HERE)
