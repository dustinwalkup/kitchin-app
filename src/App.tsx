import "./App.css";
import { useZero, useQuery } from "@rocicorp/zero/react";
import type { Schema } from "../schema";

function App() {
  const z = useZero<Schema>();
  const messages = useQuery(z.query.message);

  const addMessage = async () => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      body: `New message at ${new Date().toLocaleTimeString()}`,
    };

    // This will optimistically update the UI and then sync to server
    await z.mutate.message.insert(newMessage);
  };

  console.log("messages", messages);

  return (
    <>
      <div className="card">
        <button onClick={addMessage}>click to add message </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {messages[0].map((message) => (
        <div key={message.id} className="message">
          <h2>{message.body}</h2>
        </div>
      ))}
    </>
  );
}

export default App;
