type Props = {
  func?: () => any,
  content: string
};

export const Button = ({ func, content }: Props) => {
  return (
    <button className='px-10 py-2 bg-primary border-none rounded cursor-pointer ease-in-out hover:bg-[#2A2D36]'
      onClick={func}>
      {content}
    </button>
  );
}

