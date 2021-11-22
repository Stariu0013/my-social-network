
let subscribers: MessageCB[] = [];

let ws: WebSocket | null;

const closeHandler = () => {
    console.error('WS DISCONNECTED. Trying to reconnect...');
    setTimeout(createChannel, 3000);
};

const openHandle = () => {
    console.warn('WS connected');
};

function createChannel() {
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

    ws.addEventListener('open', openHandle);
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', handleSendMessage);
}

const handleSendMessage = (event: any) => {
    const newMessages = JSON.parse(event.data);

    subscribers.forEach(subscriber => subscriber(newMessages));
};

export const chatAPI = {
    startListening() {
        createChannel();
    },
    stopListening() {
        ws?.removeEventListener('close', closeHandler);
        ws?.removeEventListener('open', openHandle);
        ws?.close();
    },
    subscribe(callback: MessageCB) {
        subscribers.push(callback);
    },
    unsubscribe(callback: MessageCB) {
        subscribers = subscribers.filter(s => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message);
    },
};

export type MessageCB = (message: MessageT[]) => void;
export type MessageT = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

