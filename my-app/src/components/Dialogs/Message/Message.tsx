import React from 'react';
import s from './../Dialogs.module.css'

type TMessageProps = {
  message: string;
}

class Message extends React.Component<TMessageProps> {
  render = () => {
    return(
        <div className={s.message}>{this.props.message}</div>
    )
  }
}

export default Message;
