import './button.css'

type Props = {
  func?: () => void,
  content: string
}

const Button = ({ func, content }: Props) => {
  return (
    <button className='button-ui' onClick={func}><h3>{content}</h3></button>
  );
}

export default Button;
