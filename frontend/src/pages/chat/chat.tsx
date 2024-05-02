import { useEffect, useState, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import { Message } from '../../types/Message';
import { isAuth } from '../../services/auth';
import { NotFound } from '../notFound/notFound';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft, ArrowBigUp } from 'lucide-react';
import { MessageComponent } from '../../ui/message';
import './scrollBar.css';

const socket = io('http://localhost:3000');

export const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleMessage = (res: Message) => {
    setMessages(prevMessages => [...prevMessages, res ]);
  };

  const sendMessage = () => {
    setInput('');
    handleMessage({ content: input, owner: localStorage.getItem('name') ?? '', ownerColor: localStorage.getItem('color') ?? '#838383'})
    socket.emit('send_message', { content: input, owner: localStorage.getItem('name'), ownerColor: localStorage.getItem('color') });
  };

  const redirect = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const signout = () => {
    localStorage.clear();
    redirect();
  };

  useEffect(() => {
    socket.on('get_message', handleMessage);

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    return () => {
      socket.off('get_message', handleMessage); 
    };
  }, [messages]);

  const keyEnter=(event)=> {
    if (event.keyCode === 13) {
        sendMessage()
    }
  }

  if (isAuth()) {
    return (
      <div className='w-screen h-screen p-8 flex flex-col items-center justify-center gap-8 bg-background text-text md:p-32'>
        <header className='w-full p-4 absolute top-0'>
          <div className='w-fit p-1 bg-primary rounded hover:cursor-pointer' onClick={signout}>
            <ArrowBigLeft />
          </div>
        </header>
        <main className='flex flex-col w-10/12 max-h-screen overflow-y-auto p-4 mb-32'>
          {messages.map((message, index) => (
            <MessageComponent key={index} message={{ content: message.content, owner: message.owner, ownerColor: message.ownerColor }} />
          ))}
          <div ref={messagesEndRef} />
        </main>
        <footer className='flex absolute bottom-36 gap-4'>
          <input
            className='w-96 p-2 bg-primary rounded focus:outline-none'
            type='text'
            placeholder='Send a message...'
            value={input}
            onChange={(evt) => setInput(evt.target.value)}
            onKeyDown={(e) => keyEnter(e)}
          />
          <div className='flex items-center justify-center p-1 bg-primary rounded hover:cursor-pointer' onClick={sendMessage}>
            <ArrowBigUp />
          </div>
        </footer>
      </div>
    );
  } else {
    return <NotFound />;
  }
};
