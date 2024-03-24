import './notFound.css'
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from '../../ui/button/button';

const NotFound = () => {

  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate])

  return (
    <div className='not-found-container'>
      <main>
        <h1>Ooops...</h1>
        <h3>You look lost, return to home page clicking on the button below!</h3>
        <Button func={goHome} content='Go home' />
      </main>
    </div>
  );
}

export default NotFound;
