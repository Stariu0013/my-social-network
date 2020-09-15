import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = props => {

    const dialogNames = props.dialog.namesData
        .map( name => <DialogItem name={name.name} id={name.id} imgSrc={name.imgSrc}/>);

    const dialogMessages = props.dialog.messagesData
        .map( message => <Message message={message.message} />)

    const newMessageRef = React.createRef();

    const addNewMessage = () => {
        let text = newMessageRef.current.value;
        alert(text);
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
                <textarea ref={newMessageRef} cols="10" rows="2"></textarea>
                <div>
                    <button onClick={addNewMessage}>Send message</button>
                </div>
            </div>
        </div>
    )
};
export default Dialogs
