import React from 'react';
import s from './Sidebar.module.css'

type TSidebar = {
    imgSrc: string;
    name: string;
}

class Sidebar extends React.Component<TSidebar> {

    render = () => {
        return(
            <div className={s.sidebarBlock}>
                <img className={s.image} src={`${this.props.imgSrc}`} alt=""/>
                <p className={s.item}>{this.props.name}</p>
            </div>
        )
    }
}

export default Sidebar;
