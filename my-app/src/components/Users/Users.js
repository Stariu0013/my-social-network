import React from 'react';
import s from './Users.module.css';
import {NavLink} from "react-router-dom";

const Users = props => {
    let {pageSize, usersTotalCount} = props;
    let pagesCount = Math.ceil(usersTotalCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        {
            pages.map(p => {
                return <span className={props.currentPage === p && s.selectedPage}
                             onClick={() => props.onPageChanged(p)}>{p}</span>
            })
        }
        {
            props.users.map(user => <div key={user.id}>
                <span>

                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img
                                src={user.photos.small !== null ? user.photos.small : "data:image/jpeg;base64,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"}
                                alt="avatar" className={s.userImg}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed
                            ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                props.unfollow(user.id)
                            }}>Unfollow</button>
                            : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                                props.follow(user.id);
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
            </div>)
        }
    </div>
};

export default Users
