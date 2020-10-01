import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = props => {
    const addNewMessage = () => {
        let text = newMessageRef.current.value;
        props.addNewMessage(text);
        newMessageRef.current.value = '';
    };

    const onMessageChange = e => {
        props.onMessageChange(e);
    }


    const messageBody = props.dialogData.newMessageBody;

    const dialogNames = props.dialogData.namesData
        .map( name => <DialogItem name={name.name} id={name.id} imgSrc={name.imgSrc}/>);

    const dialogMessages = props.dialogData.messagesData
        .map( message => <Message message={message.message} />);

    const newMessageRef = React.createRef();

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

/*
class Dialogs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addNewMessage: props.addNewMessage,
            onMessageChange: props.onMessageChange
        }
    }

    componentDidMount() {
        this.addNewMessage = () => {
            let text = this.newMessageRef.current.value;
            this.state.addNewMessage(text);
            this.newMessageRef.current.value = '';
        };

        this.onMessageChange = e => {
            this.state.onMessageChange(e);
        }
    }

    messageBody = this.props.dialogData.newMessageBody;

    dialogNames = this.props.dialogData.namesData
        .map( name => <DialogItem name={name.name} id={name.id} imgSrc={name.imgSrc}/>);

    dialogMessages = this.props.dialogData.messagesData
        .map( message => <Message message={message.message} />);

    newMessageRef = React.createRef();

    render = () => {
        return (
            <div>
                <div className={s.dialogs}>
                    <div className={s.dialogItems}>
                        {this.dialogNames}
                    </div>

                    <div className={s.messages}>
                        {this.dialogMessages}
                    </div>
                </div>
                <div>
                    <textarea ref={this.newMessageRef} value={this.messageBody} onChange={() => this.onMessageChange} cols="10" rows="2"></textarea>
                    <div>
                        <button onClick={this.addNewMessage}>Send message</button>
                    </div>
                </div>
            </div>
        )
    }
}
*/

export default Dialogs
