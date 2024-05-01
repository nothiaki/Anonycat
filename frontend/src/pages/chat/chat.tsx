import { useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { io } from 'socket.io-client';
import { Message } from '../../types/Message';
import { isAuth } from '../../services/auth';
import { NotFound } from '../notFound/notFound';

const socket = io('http://localhost:3000');

export const Chat = () => {

  const [getMessage, setGetMessage] = useState('');
  const [input, setInput] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { content: input, owner: localStorage.getItem('name') });
  };

  useEffect(() => {
    socket.on('get_message', (res: Message) => {
      setGetMessage(res.content);
    });
  }, [socket]);

  if (isAuth()) {

    return (
      <div
        className='w-screen min-h-screen p-8 flex flex-col items-center justify-center gap-8 bg-background text-text md:p-32'>
        <input className='w-full p-1 mt-0.5 bg-[#ffffff00] border-b-2 border-primary focus:outline-none'
          type='text' placeholder='Send a message...' onChange={(evt) => { setInput(evt.target.value) }}
        />
        <Button func={sendMessage} content='Send' />
        <p>messages...</p>
        <p>messages...</p>
        <p>{getMessage}</p>
      </div>
    );
  } else {

    return <NotFound />

  }

}

