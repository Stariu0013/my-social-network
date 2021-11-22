import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessageListening, stopMessageListening} from "../../redux/chat-reducer";
import {getMessagesSelector} from "../../selectors/chat-selector";

type WSMessage = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

const Chat: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessageListening());

        return () => {
            dispatch(stopMessageListening());
        }
    }, []);

    return <div>
        <Messages />
        <AddNewMessageForm />
    </div>;
};

const Messages: React.FC = () => {
    const messages = useSelector(getMessagesSelector);

    return <div style={{height: "400px", overflowY: "auto"}}>
        {
            messages.map((elem, index) => <Message key={index} message={elem}/>)
        }
    </div>;
};

type MessageComponent = {
    message: WSMessage;
};

const Message: React.FC<MessageComponent> = ({ message }) => {
    return <div key={message.userId}>
        <img src={message.photo} alt={message.photo}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>;
};

const AddNewMessageForm: React.FC = () => {
    const [message, setMessage] = useState('');

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }

        sendMessage(message);
        setMessage('');
    };
    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    return <>
        <div>
            <textarea onChange={onMessageChange} value={message}/>
        </div>
        <div>
            <button onClick={sendMessageHandler}>Send message</button>
        </div>
    </>;
};

export default Chat;
