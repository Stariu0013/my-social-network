import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Textarea} from "../common/FormControls/FormControls";
import {fieldMaxLength, requiredField} from "../../utils/validators/validator";
import {TDialogsInitialState} from "../../redux/dialogs-reducer";

const maxLength = fieldMaxLength(50);

type TMapStateToProps = {
    dialogData: TDialogsInitialState;
    isAuth: boolean;
}

type TDispatchToProps = {
    addNewMessage: (message: string) => void;
}

const Dialogs: React.FC<TMapStateToProps & TDispatchToProps> = (props) => {

    const sendNewMessage = (value: { addNewMessage: string }) => {
        props.addNewMessage(value.addNewMessage);
        value.addNewMessage = '';
    };

    const dialogNames = props.dialogData.namesData
        .map( name => <DialogItem name={name.name} id={name.id} imgSrc={name.imgSrc}/>);

    const dialogMessages = props.dialogData.messagesData
        .map( message => <Message message={message.message} />);

    return (
        <div>
            <div className={s.dialogs}>
                <div className={s.dialogItems}>
                    {dialogNames}
                </div>

                <div className={s.messages}>
                    {dialogMessages}
                </div>
                <AddNewReduxMessageForm onSubmit={sendNewMessage}/>
            </div>

        </div>
    )
};

type TNewMessageNameKeys = {
    addNewMessage: string;
}

type TFormDataKeys = Extract<keyof TNewMessageNameKeys, string>

const addNewMessageForm: React.FC<InjectedFormProps<TNewMessageNameKeys>> = (props: any) => {
  return(
      <form onSubmit={props.handleSubmit}>
          <div>
              {createField<TFormDataKeys>("text", "addNewMessage", [requiredField, maxLength], "Enter message", Textarea)}
          </div>
          <div>
              <button>Send message</button>
          </div>
      </form>
  )
};

const AddNewReduxMessageForm = reduxForm<TNewMessageNameKeys>({ form: 'addNewMessage'})(addNewMessageForm);

export default Dialogs
