import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { io } from "socket.io-client";
import { Message } from "../../types/Message";

const socket = io('http://localhost:3000');

export const Chat = () => {
  const [getMessage, setGetMessage] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { content: 'funcifdsafdsagdsa', owner: 'hiaki' });
  };

  useEffect(() => {
    socket.on('get_message', (res: Message) => {
      alert(res);
      console.log(res);
      setGetMessage(res.content);
    });
  }, [socket]);

  return (
    <div>
      <h1>Chat Page</h1>
      <p>{getMessage}</p>
      <Button func={sendMessage} content='Send' />
    </div>
  );
}

