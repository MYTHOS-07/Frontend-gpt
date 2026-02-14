import config from "../config/index";

export async function createChat(prompt, currThreadId) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: prompt,
      threadId: currThreadId,
    }),
  };

  try {
    const response = await fetch(`${config.apiUrl}/api/chat`, options);

    const res = await response.json();

    return res.reply;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllChats() {
  try {
    const response = await fetch(`${config.apiUrl}/api/thread`);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getChat(newThreadId) {
  try {
    const response = await fetch(`${config.apiUrl}/api/thread/${newThreadId}`);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteChat(threadId) {
  try {
    const response = await fetch(`${config.apiUrl}/api/thread/${threadId}`, {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
