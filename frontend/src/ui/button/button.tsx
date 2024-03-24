import './button.css'

type Props = {
  func: () => void,
  content: string
}

const Button = (props: Props) => {
  return (
    <button className='button-ui' onClick={props.func}><h3>{props.content}</h3></button>
  );
}

export default Button;
