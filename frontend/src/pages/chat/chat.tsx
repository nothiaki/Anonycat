import Button from '../../ui/button/button';

const Chat = () => {

  const onMessage = () => {
    console.log('hi');
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <Button func={onMessage} content='send' />
    </div>
  );
}

export default Chat;
