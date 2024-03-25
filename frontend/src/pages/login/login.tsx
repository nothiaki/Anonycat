import './login.css'
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button/button';
import InputText from '../../ui/inputText/inputText';

const Login = () => {
  const navigate = useNavigate();

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate])

  return (
    <div className="login-container">
      <form method="post">
        <div className='right'>
          <img src='https://pbs.twimg.com/profile_images/1770271023885144064/O9lHM-qY_400x400.jpg' />
          <Button func={goHome} content='Upload picture' />
        </div>
        <div className="spaceBar"></div>
        <div className='left'>
          <InputText label='Anonyname:' name='anonyname-input' />
          <input type="color" name="input-color" id="input-color" />
          <Button func={goHome} content='Join chat' />
        </div>
      </form>
    </div>
  );
}

export default Login;
