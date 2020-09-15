import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Navbar = props => {

    let friendList = props.state.sidebar.friends.map(friend => <Sidebar name={friend.name} imgSrc={friend.imgSrc}/>);

    return (
        <nav className={s.nav}>
            <div className={s.item}><NavLink to="/profile" activeClassName={s.activeItem}>Profile</NavLink></div>
            <div className={s.item}><NavLink to="/dialogs" activeClassName={s.activeItem}>Messages</NavLink></div>
            <div className={s.item}><NavLink to="/news" activeClassName={s.activeItem}>News</NavLink></div>
            <div className={s.item}><NavLink to="/music" activeClassName={s.activeItem}>Music</NavLink></div>
            <div className={s.item}><NavLink to="/settings" activeClassName={s.activeItem}>Settings</NavLink></div>
            <div className={s.friendBlock}>
                <h1>Friends</h1>
                {friendList}
            </div>
        </nav>
    )
};

export default Navbar;
