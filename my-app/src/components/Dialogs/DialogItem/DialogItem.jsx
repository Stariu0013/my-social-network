import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

class DialogItem extends React.Component {
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
