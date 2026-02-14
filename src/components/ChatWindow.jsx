import "../css/ChatWindow.css";
import Chat from "./Chat.jsx";
import MyContext from "../context/MyContext.jsx";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { createChat } from "../api/api.js";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    setNewChat(false);

    const trimmed = prompt.trim();

    // show user message immediately
    if (trimmed) {
      setPrevChats((prev) => [...prev, { role: "user", content: trimmed }]);
    }

    setPrompt("");

    try {
      const replyAi = await createChat(trimmed, currThreadId);

      if (replyAi) {
        setReply(replyAi);
        setPrevChats((prev) => [...prev, { role: "assistant", content: replyAi }]);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          CodeGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i className="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}
      <Chat></Chat>

      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>

      <div className="chatInput">
        <div className="inputBox">
          <input
            className="input"
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          codeGPT can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
