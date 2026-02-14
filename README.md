# CodeGPT Frontend (Vite + React)

A clean, chat-style UI built with React and Vite. It provides a multi-thread chat experience (new chat, thread history, delete) and a polished message view with Markdown + syntax highlighting.

![CodeGPT Frontend](https://res.cloudinary.com/dcjobwnp5/image/upload/v1771085169/image_12_pi1c4c.png)


## What this project does

- Creates and manages chat threads.
- Sends user prompts to a backend API and renders assistant replies.
- Shows typing-style reply animation and code highlighting.
- Provides a left sidebar for thread history and actions.

## Tech stack

- React 19 + Vite 7
- React Context API for state sharing
- `react-markdown` + `rehype-highlight` for Markdown and code blocks
- `react-spinners` for loading state
- `uuid` for thread IDs
- Font Awesome for icons

## Visual project structure

```
.
├─ public/
├─ src/
│  ├─ api/
│  │  └─ api.js
│  ├─ assets/
│  ├─ components/
│  │  ├─ Chat.jsx
│  │  ├─ ChatWindow.jsx
│  │  └─ Sidebar.jsx
│  ├─ config/
│  │  └─ index.js
│  ├─ context/
│  │  └─ MyContext.jsx
│  ├─ css/
│  │  ├─ Chat.css
│  │  ├─ ChatWindow.css
│  │  └─ Sidebar.css
│  ├─ App.css
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ eslint.config.js
├─ vite.config.js
└─ package.json
```

## What is used where (and why)

### Entry and app shell

- `index.html`
	- Loads Font Awesome via CDN.
	- Mount point: `<div id="root"></div>`.
- `src/main.jsx`
	- React entry point that renders `App` under `StrictMode`.
- `src/App.jsx`
	- Owns top-level app state (prompt, reply, thread ID, history).
	- Provides state via `MyContext.Provider`.
	- Renders `Sidebar` and `ChatWindow` side by side.

### State management

- `src/context/MyContext.jsx`
	- Creates a React context to share state across components.
	- Keeps prop drilling minimal.

### UI components

- `src/components/Sidebar.jsx`
	- New chat button resets state and generates a new thread ID.
	- Fetches all threads and renders them as history.
	- Switches between threads and loads their chats.
	- Deletes threads and updates UI immediately.

- `src/components/ChatWindow.jsx`
	- Top navbar and user menu drop-down.
	- Chat input, Enter-to-send, and send button.
	- Calls API for replies and pushes messages to state.
	- Shows a loading spinner during requests.

- `src/components/Chat.jsx`
	- Renders message list (user vs assistant styling).
	- Markdown rendering and syntax highlighting for code blocks.
	- Simulates typing effect for the latest assistant reply.

### API layer

- `src/api/api.js`
	- `createChat(prompt, threadId)` -> POST `/api/chat`
	- `getAllChats()` -> GET `/api/thread`
	- `getChat(threadId)` -> GET `/api/thread/:threadId`
	- `deleteChat(threadId)` -> DELETE `/api/thread/:threadId`

### Configuration

- `src/config/index.js`
	- Reads Vite env vars:
		- `VITE_APP_NAME` (optional)
		- `VITE_API_URL` (required for backend calls)

### Styling

- `src/App.css`
	- Global layout and base colors.
- `src/css/Chat.css`
	- Message list layout, chat bubble styles, code block styling.
- `src/css/ChatWindow.css`
	- Navbar, input area, dropdown menu styles.
- `src/css/Sidebar.css`
	- Sidebar layout, history list, hover effects.

## Setup

1. Install dependencies
	 ```bash
	 npm install
	 ```

2. Create a `.env` file in the project root
	 ```bash
	 VITE_API_URL=http://localhost:3000
	 VITE_APP_NAME=CodeGPT
	 ```


## Learnings from this project
- Building a chat UI with message streaming and typing effects.
- Managing shared state with React Context.
- Handling async API flows and optimistic UI updates.
- Rendering Markdown safely and highlighting code blocks.
- Structuring a React app with clear separation of UI, API, and config.
- Styling a responsive layout with reusable component CSS.

## Notes

- This is a frontend-only project. You need a compatible backend that exposes the endpoints listed above.
- The UI expects threads to include `threadId` and `title`.

## Related Projects

- **[backend-codegpt](https://github.com/MYTHOS-07/backend-codegpt)** – The backend API server that handles chat creation, thread management, and AI prompt processing. Required for this frontend to function.


## Scripts
- `npm install` - install dependencies
- `npm run dev` - start local dev server


