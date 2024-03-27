import './login.css'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/button';
import { io } from 'socket.io-client';
import { useForm } from 'react-hook-form';

const socket = io('http://localhost:3000');

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const joinChat = (data: any) => {
    socket.emit('on_chat', data);
  }

  const redirect = useCallback(() => {
    navigate('/chat');
  }, [navigate])


  return (
    <div className='login-container'>
      <form onSubmit={handleSubmit(joinChat)}>
        <div className='left'>
          <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />
          <Button func={redirect} content='Upload picture' />
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
          <Button content='Join chat' func={redirect} />
        </div>
      </form>
    </div>
  );
}

export default Login;
