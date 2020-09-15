import React from 'react';
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";


const DialogItem = props => {
    const path = "/dialogs/" + props.id;
    return(
        <div className={s.dialog + " " + s.active}>
            <img className={s.image} src={props.imgSrc} alt=""/>
            <NavLink to={path}>{props.name}</NavLink></div>
    )
};

export default DialogItem;
