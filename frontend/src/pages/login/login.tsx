import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Error } from '../../ui/error';
import axios from 'axios';

const inputSchema = z.object({
  color: z.string(),
  name: z.string()
});

type User = z.infer<typeof inputSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(inputSchema)
  });

  const [isNameInvalid, setNameInvalid] = useState(false)
  const [errorText, setErrorText] = useState('')

  const redirect = useCallback(() => {
    navigate('/chat');
  }, [navigate]);

  const joinChat = async (data: User) => {

    try {
      const res = await axios.post('http://localhost:3000/user', data);

      console.log(res.data.message)

      localStorage.setItem('name', data.name);
      localStorage.setItem('color', data.color);
      redirect();

    } catch (error: any) {
      setErrorText(error.response.data.message)
      setNameInvalid(true)
      console.log(error)
    }

  };

  return (
    <div
      className='w-screen min-h-screen p-12 flex flex-col items-center justify-center gap-8 bg-background text-text md:flex-row md:p-36'>
      <div className='flex flex-col gap-10 md:w-1/2'>
        <h1 className='text-4xl font-medium'>Join now on <br />Anonycat! <br />Shh...</h1>
        <p>Welcome to our website where you can create a temporary account and send anonymous messages, which are deleted every 40 minutes.</p>
        <p>Remember to read our <a className='text-link' href='#'>privacy policy terms</a>.</p>
      </div>
      <form className='w-full flex flex-col gap-12 md:w-1/2' autoComplete='off' onSubmit={handleSubmit(joinChat)}>
        <label>
          <h3>Username:</h3>
          <input className='w-full p-1 mt-0.5 bg-[#ffffff00] border-b-2 border-primary focus:outline-none'
            type='text' {...register('name')}
            onChange={(e) => {
              e.preventDefault();
              setNameInvalid(false);
            }}
            required
            onInvalid={(e) => {
              e.preventDefault();
              setNameInvalid(true);
              setErrorText('the username cannot be empty.');
            }}
          />
        </label>
        <label>
          <h3>Color:</h3>
          <input className='w-full mt-2 border-none bg-background hover:cursor-pointer'
            type="color" {...register('color')}
          />
        </label>
        <Button content='Join Chat' />
      </form>
      {isNameInvalid && <Error text={errorText}/>}
    </div >
  );
}

