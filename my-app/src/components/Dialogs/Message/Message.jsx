import React from 'react';
import s from './../Dialogs.module.css'

class Message extends React.Component {
  render = () => {
    return(
        <div className={s.message}>{this.props.message}</div>
    )
  }
}

export default Message;
