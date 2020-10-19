import React from 'react';
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }
    friendList = this.props.friends.map(friend => <Sidebar name={friend.name} key={friend.id + "friend_key"} imgSrc={friend.imgSrc}/>)

    render = () => {
        return (
            <nav className={s.nav}>
                <div className={s.item}><NavLink to="/profile" activeClassName={s.activeItem}>Profile</NavLink></div>
                <div className={s.item}><NavLink to="/dialogs" activeClassName={s.activeItem}>Messages</NavLink></div>
                <div className={s.item}><NavLink to="/users" activeClassName={s.activeItem}>Users</NavLink></div>
                <div className={s.item}><NavLink to="/news" activeClassName={s.activeItem}>News</NavLink></div>
                <div className={s.item}><NavLink to="/music" activeClassName={s.activeItem}>Music</NavLink></div>
                <div className={s.item}><NavLink to="/settings" activeClassName={s.activeItem}>Settings</NavLink></div>
                <div className={s.friendBlock}>
                    <h1>Friends</h1>
                    {this.friendList}
                </div>
            </nav>
        )
    }
}

export default Navbar;
