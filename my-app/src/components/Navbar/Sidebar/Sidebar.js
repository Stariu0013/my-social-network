import React from 'react';
import s from './Sidebar.module.css'

const Sidebar = props => {
    return(
        <div className={s.sidebarBlock}>
            <img className={s.image} src={`${props.imgSrc}`} alt=""/>
            <p className={s.item}>{props.name}</p>
        </div>
    )
};

export default Sidebar;
