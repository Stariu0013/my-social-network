import React from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";
import {TUser} from "../../types/types";
import DefaultAvatar from '../../assets/images/defaultImg.jpg';

type TUserProps = {
    user: TUser,
    followingInProgress: number[],

    unfollow: (id: number) => void,
    follow: (id: number) => void,
}

const User: React.FC<TUserProps> = ({user, followingInProgress, unfollow, follow}) => {
    return <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img
                            src={user.photos.small !== null ? user.photos.small : DefaultAvatar}
                            alt="avatar" className={s.userImg}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id);
                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{'Country unknown'}</div>
                    <div>{"City unknown"}</div>
                </span>
            </span>
    </div>
};

export default User;
