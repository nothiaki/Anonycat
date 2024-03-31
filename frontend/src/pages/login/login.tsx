import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

const inputSchema = z.object({
  color: z.string(),
  name: z.string()
});

type FormData = z.infer<typeof inputSchema>;

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(inputSchema)
  });

  const joinChat = async (data: FormData) => {
    const res = await fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return console.log(res);
    };

    localStorage.setItem('name', data.name);
    localStorage.setItem('color', data.color);
    redirect();
  };

  const redirect = useCallback(() => {
    navigate('/chat');
  }, [navigate]);

  const uploadPicture = (evt: any) => {
    evt.preventDefault();
    alert('This feature will coming soon!');
  };

  return (
    <div
      className='w-screen min-h-screen p-8 flex flex-col items-center justify-center gap-8 bg-background text-text md:flex-row md:p-32'>
      <div className='flex flex-col gap-10 md:w-1/2'>
        <h1 className='text-4xl font-medium'>Join now on <br />Anonycat! <br />Shh.</h1>
        <p>Welcome to our website where you can create a temporary account and send anonymous messages, which are deleted every 40 minutes.</p>
        <p>Remember to read our <a className='text-link' href='#'>privacy policy terms</a>.</p>
      </div>

      <form className='w-full flex flex-col gap-10 md:w-1/2' onSubmit={handleSubmit(joinChat)}>
        <div className='flex items-end gap-4'>
          <img className='w-28 h-28 rounded' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' />
          <div className='flex flex-col justify-around'>
            <label>
              <h3>Color:</h3>
              <input className='w-full border-none bg-background hover:cursor-pointer'
                type="color" {...register('color')}
              />
            </label>
            <Button func={uploadPicture} content='Picture' />
          </div>
        </div>
        <label>
          <h3>Username:</h3>
          <input className='w-full p-1 mt-0.5 bg-[#ffffff00] border-b-2 border-primary focus:outline-none'
            type='text' {...register('name')}
          />
        </label>
        <Button content='Join Chat' />
      </form>
    </div >
  );
}

