import React, {ChangeEvent, useEffect, useState} from 'react';

type WSMessage = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
}
type WSComponent = {
    wsChannel: WebSocket | null;
}

const Chat: React.FC = () => {
    const [wsChannel, setWSChannel] = useState<WebSocket | null>(null);

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            console.error('WS DISCONNECTED. Trying to reconnect...');
            setTimeout(createChannel, 3000);
        };

        const openHandle = () => {
            console.warn('WS connected');
        };

        function createChannel() {
            ws?.removeEventListener('close', closeHandler);
            ws?.removeEventListener('open', openHandle);
            ws?.close();

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

            ws.addEventListener('open', openHandle);
            ws.addEventListener('close', closeHandler);

            setWSChannel(ws);
        }

        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        };
    }, []);

    return <div>
        <Messages wsChannel={wsChannel}/>
        <AddNewMessageForm wsChannel={wsChannel}/>
    </div>;
};

const Messages: React.FC<WSComponent> = ({wsChannel: ws}) => {
    const [messages, setMessages] = useState<WSMessage[]>([]);

    const handleSendMessage = (event: any) => {
        const newMessages = JSON.parse(event.data);

        setMessages(prevState => [...prevState, ...newMessages]);
    };

    useEffect(() => {
        ws?.addEventListener('message', handleSendMessage);

        return () => {
            ws?.removeEventListener('message', handleSendMessage);
            ws?.close();
        };
    }, [ws]);

    return <div style={{height: "400px", overflowY: "auto"}}>
        {
            messages.map((elem, index) => <Message key={index} message={elem}/>)
        }
    </div>;
};

type MessageComponent = {
    message: WSMessage;
}

const Message: React.FC<MessageComponent> = ({ message }) => {
    return <div key={message.userId}>
        <img src={message.photo} alt={message.photo}/><b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>;
};

const AddNewMessageForm: React.FC<WSComponent> = ({wsChannel: ws}) => {
    const [message, setMessage] = useState('');
    const [readyState, setReadyState] = useState<'ready' | 'pending'>('pending');

    const setReadyStateFn = () => {
        setReadyState('ready');
    };

    useEffect(() => {
        ws?.addEventListener('open',setReadyStateFn);

        return () => {
            ws?.removeEventListener('open',setReadyStateFn);
        };
    }, [ws]);

    const sendMessage = () => {
        if (!message) {
            return;
        }

        ws?.send(message);
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
            <button disabled={readyState !== 'ready'} onClick={sendMessage}>Send message</button>
        </div>
    </>;
};

export default Chat;
