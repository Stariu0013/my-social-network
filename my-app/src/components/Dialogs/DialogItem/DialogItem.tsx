import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type TDialogItemProps = {
    id: string;
    imgSrc: string;
    name: string;
}

class DialogItem extends React.Component<TDialogItemProps> {
    path = "/dialogs/" + this.props.id;

    render = () => {
        return(
            <div className={s.dialog + " " + s.active}>
                <img className={s.image} src={this.props.imgSrc} alt=""/>
                <NavLink to={this.path}>{this.props.name}</NavLink></div>
        )
    }
}

export default DialogItem;
