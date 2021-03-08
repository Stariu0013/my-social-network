import React from 'react';
import Paginator from "../common/Pagination/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type TUsers = {
    currentPage: number,
    users: UserType[],
    followingInProgress: number[],
    pageSize: number,
    totalItemsCount: number,

    onPageChanged: (p: number) => void,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
}

const Users: React.FC<TUsers> = (props) => {

    return <div>
        <Paginator {...props} pageSize={props.pageSize} totalItemsCount={props.totalItemsCount}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={5}/>
        {
            props.users.map((u: UserType) => <User follow={props.follow}
                                       followingInProgress={props.followingInProgress}
                                       unfollow={props.unfollow}
                                       user={u}
                                       key={u.id}
            />)
        }
    </div>
};

export default Users
