import './login.css'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/button';
import { io } from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const socket = io('http://localhost:3000');

const inputSchema = z.object({
  color: z.string(),
  name: z.string()
});

type FormData = z.infer<typeof inputSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(inputSchema)
  });

  const joinChat = (data: FormData) => {
    try {
      socket.emit('on_chat', data);
      redirect();
    } catch (err) {
      console.log('deu erro')
    };
  };

  const redirect = useCallback(() => {
    navigate('/chat');
  }, [navigate]);

  const uploadPicture = () => {
    alert('This feature will coming soon!');
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit(joinChat)}>
        <div className='left'>
          <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />
          <Button func={uploadPicture} content='Upload picture' />
        </div>
        <div className='right'>
          <label className='input-text-label'>
            <h3>Anonyname:</h3>
            <input type='text' id='input-text' {...register('name')} />
          </label>

          <label className='input-color-text-label'>
            <h3>Color:</h3>
            <input className='input-color' type="color" {...register('color')} />
          </label>
          <Button content='Join chat' />
        </div>
      </form>
    </div>
  );
}

export default Login;
