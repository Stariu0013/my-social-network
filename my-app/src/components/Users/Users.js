import React from 'react';
import Paginator from "../common/Pagination/Paginator";
import User from "./User";

const Users = props => {

    return <div>
        <Paginator {...props} currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={5}/>
        {
            props.users.map(u => <User follow={props.follow}
                                       followingInProgress={props.followingInProgress}
                                       unfollow={props.unfollow}
                                       user={u}
                                       key={u.id}
            />)
        }
    </div>
};

export default Users
