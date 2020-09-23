import React from 'react';
import s from './Users.module.css';

let Users = props => {
    console.log(props);
    return <div>
        {
            props.users.map(user => <div key={user.id}>
                <span>
                    <div>
                        <img src={user.imgURL} alt="avatar" className={s.userImg}/>
                    </div>
                    <div>
                        {user.followed
                            ? <button onClick={() => {props.unfollow(user.id); console.log(props)}}>Unfollow</button>
                            : <button onClick={() => {props.follow(user.id); console.log(props)}}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{user.fullName}</div>
                        <div>{user.status}</div>
                    </span>
                    <span>
                        <div>{user.location.country}</div>
                        <div>{user.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
};

export default Users;
