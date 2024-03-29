import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/button';

export const NotFound = () => {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-background text-text'>
      <main className='flex items-start flex-col p-8 gap-6'>
        <h1 className='text-2xl font-medium'>Ooops...</h1>
        <h3>You look lost, return to home page clicking on the button below!</h3>
        <Button func={goHome} content='Go home' />
      </main>
    </div>
  );
}

