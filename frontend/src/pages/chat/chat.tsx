import { useEffect, useState, useCallback } from 'react';
import { Button } from '../../ui/button';
import { io } from 'socket.io-client';
import { Message } from '../../types/Message';
import { isAuth } from '../../services/auth';
import { NotFound } from '../notFound/notFound';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, ArrowBigUp } from 'lucide-react';

const socket = io('http://localhost:3000');

export const Chat = () => {
  const navigate = useNavigate();
  const [getMessage, setGetMessage] = useState('');
  const [input, setInput] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', { content: input, owner: localStorage.getItem('name') });
  };

  const redirect = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const signout = () => {
    localStorage.clear();
    redirect();
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
        <header className='w-full p-4 absolute top-0'>
          <div className='w-fit p-1 bg-primary rounded hover:cursor-pointer' onClick={signout}>
            <ArrowBigLeft />
          </div>
        </header>
        <main>
          <p>messages...</p>
          <p>messages...</p>
          <p>{getMessage}</p>
        </main>
        <footer className='absolute bottom-0 p-4 flex gap-4'>
          <input className='w-full p-2 bg-primary rounded focus:outline-none'
            type='text' placeholder='Send a message...' onChange={(evt) => { setInput(evt.target.value) }}
          />
          <div className='flex items-center justify-center p-1 bg-primary rounded hover:cursor-pointer' onClick={signout}>
            <ArrowBigUp />
          </div>
        </footer>
      </div>
    );
  } else {
    return <NotFound />
  };
}

