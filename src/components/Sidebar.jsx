import "../css/Sidebar.css";
import { useContext, useEffect } from "react";
import MyContext from "../context/MyContext.jsx";
import { v4 as uuidv4 } from "uuid";
import { deleteChat, getAllChats, getChat } from "../api/api.js";

function Sidebar() {
  const {
    allThreads,
    reply,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReply,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    const res = await getAllChats();

    const filteredData = res.map((thread) => ({
      threadId: thread.threadId,
      title: thread.title,
    }));
    setAllThreads(filteredData);
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId, reply]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv4());
    setPrevChats([]);
  };

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    const res = await getChat(newThreadId);
    setPrevChats(res);
    setNewChat(false);
    setReply(null);
  };

  const deleteThread = async (threadId) => {
    deleteChat(threadId);

    //updated threads re-render
    setAllThreads((prev) =>
      prev.filter((thread) => thread.threadId !== threadId)
    );

    if (threadId === currThreadId) {
      createNewChat();
    }
  };

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img
          src="src/assets/blacklogo.png"
          alt="gpt logo"
          className="logo"
        ></img>
        <div>New Chat</div>
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li
            key={idx}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : " "}
          >
            {thread.title}
            <i
              className="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation(); //stop event bubbling
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>

      <div className="sign">
        <p>By Punit Giri &hearts;</p>
      </div>
    </section>
  );
}

export default Sidebar;
