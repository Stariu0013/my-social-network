import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormControls/FormControls";
import {fieldMaxLength, requiredField} from "../../utils/validators/validator";

const maxLength = fieldMaxLength(50);

const Dialogs = props => {

    const sendNewMessage = value => {
        props.addNewMessage(value.addNewMessage);
        value.addNewMessage = '';
    };

    const dialogNames = props.dialogData.namesData
        .map( name => <DialogItem name={name.name} id={name.id} imgSrc={name.imgSrc}/>);

    const dialogMessages = props.dialogData.messagesData
        .map( message => <Message message={message.message} />);


    if(!props.isAuth) return <Redirect to={"/login"} />;
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

const addNewMessageForm = props => {
  return(
      <form onSubmit={props.handleSubmit}>
          <div>
              <Field component={Textarea} validate={[requiredField, maxLength]} name="addNewMessage" placeholder="Enter message"/>
          </div>
          <div>
              <button>Send message</button>
          </div>
      </form>
  )
};

const AddNewReduxMessageForm = reduxForm({ form: 'addNewMessage'})(addNewMessageForm);

export default Dialogs
