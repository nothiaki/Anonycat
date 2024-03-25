import './inputText.css'

type Props = {
  label: string,
  name: string
}

const InputText = ({ label, name }: Props) => {
  return (
    <>
      <label className='input-text-label'>
        <h3>{label}</h3>
        <input type="text" name={name} id="input-text" />
      </label>
    </>
  );
}

export default InputText;
