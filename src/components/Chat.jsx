import "../css/Chat.css";
import React, { useContext, useState, useEffect } from "react";
import MyContext from "../context/MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  // Typing effect for GPT response
  useEffect(() => {
    if (!reply) {
      setLatestReply(" ");
      return;
    }

    let idx = 0;
    const words = reply.split(" ");
    const interval = setInterval(() => {
      idx++;
      setLatestReply(words.slice(0, idx).join(" "));
      if (idx >= words.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [reply]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}
      <div className="chats">
        {prevChats?.map((chat, idx) => {
          const isLastChat = idx === prevChats.length - 1;
          const isTyping = chat.role === "assistant" && reply && isLastChat;

          return (
            <div
              className={chat.role === "user" ? "userDiv" : "gptDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {isTyping ? latestReply : chat.content}
                </ReactMarkdown>
              )}
            </div>
          );
        })}

        {/* Optionally, you can show typing cursor */}
        {reply && <div className="gptDiv typingCursor">▌</div>}
      </div>
    </>
  );
}

export default Chat;
