import Button from "../../ui/button/button";
import InputText from "../../ui/inputText/inputText";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
console.log(socket);

const Chat = () => {

  const onMessage = () => {
    console.log("mensagem");
    socket.emit('on_chat', { color: '#FFFFFF', name: 'username' })
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <InputText label="Send message" name="send-message" />
      <Button func={onMessage} content="send" />
    </div>
  );
}

export default Chat;
