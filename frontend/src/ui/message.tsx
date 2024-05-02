import { Message } from "../types/Message";

export const MessageComponent = (props: { message: Message }) => {

    const { content, owner, ownerColor } = props.message;
    const isOwnerMessage = owner == localStorage.getItem('name')? "justify-end" : "justify-start"; 

    return (
        <div className= {`flex ${isOwnerMessage}`}>
            <p className='items-center bg-primary rounded p-2 m-1 max-w-screen-md break-words' style={{ color: ownerColor ?? '#838383' }}>{content}</p>
        </div>
    );
}