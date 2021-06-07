import React from 'react';
import Paginator from "../common/Pagination/Paginator";
import User from "./User";
import {TUser} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {TFilter} from "../../redux/users-reducer";

type TUsers = {
    currentPage: number,
    users: TUser[],
    followingInProgress: number[],
    pageSize: number,
    totalItemsCount: number,

    onPageChanged: (p: number) => void,
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    onFilterChange: (filter: TFilter) => void,
}

const Users: React.FC<TUsers> = (props) => {

    return <div>

        <UsersSearchForm onFilterChange={props.onFilterChange}/>

        <Paginator {...props} pageSize={props.pageSize} totalItemsCount={props.totalItemsCount}
                   currentPage={props.currentPage} onPageChanged={props.onPageChanged} portionSize={5}/>
        {
            props.users.map((u: TUser) => <User follow={props.follow}
                                                followingInProgress={props.followingInProgress}
                                                unfollow={props.unfollow}
                                                user={u}
                                                key={u.id}
            />)
        }
    </div>
};

export default Users
