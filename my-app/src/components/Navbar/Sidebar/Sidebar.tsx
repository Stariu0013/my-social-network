import React from 'react';
import s from './Sidebar.module.css'

class Sidebar extends React.Component {

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
