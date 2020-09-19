import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = props => {
    console.log(props);
    let messageBody = props.dialogData.newMessageBody;

    const dialogNames = props.dialogData.namesData
        .map( name => <DialogItem name={name.name} id={name.id} imgSrc={name.imgSrc}/>);

    const dialogMessages = props.dialogData.messagesData
        .map( message => <Message message={message.message} />);

    const newMessageRef = React.createRef();

    const addNewMessage = () => {
        let text = newMessageRef.current.value;
        props.addNewMessage(text);
        newMessageRef.current.value = '';
    };

    const onMessageChange = e => {
        props.onMessageChange(e);
    };

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogItems}>
                    {dialogNames}
                </div>

                <div className={s.messages}>
                    {dialogMessages}
                </div>
            </div>
            <div>
                <textarea ref={newMessageRef} value={messageBody} onChange={onMessageChange} cols="10" rows="2"></textarea>
                <div>
                    <button onClick={addNewMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
};
export default Dialogs
