import { Message } from "../types/Message";

export const MessageComponent = (props: { message: Message }) => {

    const { content, owner } = props.message;
    const isOwnerMessage = owner == localStorage.getItem('name')? "justify-end" : "justify-start"; 

    return (
        <div className= {`flex ${isOwnerMessage}`}>
            <p className="items-center bg-primary rounded p-1 m-1">{content}</p>
        </div>
    );
}