import React, { useEffect } from 'react';
import Paginator from "../common/Pagination/Paginator";
import User from "./User";
import { TUser } from "../../types/types";
import { UsersSearchForm } from "./UsersSearchForm";
import { actions, follow, requestUsers, TFilter, unfollow } from "../../redux/users-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurrentPage,
    getFilter,
    getFollowingInProgress,
    getPageSize,
    getUsers,
    getUsersTotalCount,
} from "../../selectors/user-selector";

const Users: React.FC = (props) => {
    const pageSize = useSelector(getPageSize);
    const totalItemsCount = useSelector(getUsersTotalCount);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter));
    }, []);

    const followUser = (id: number) => {
        dispatch(follow(id));
    };
    const unfollowUser = (id: number) => {
        dispatch(unfollow(id));
    };
    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    };
    const onFilterChange = (filter: TFilter) => {
        dispatch(actions.setFilter(filter));
        dispatch(requestUsers(1, pageSize, filter));
    };

    return <div>
        <UsersSearchForm onFilterChange={onFilterChange}/>

        <Paginator {...props} pageSize={pageSize} totalItemsCount={totalItemsCount}
                   currentPage={currentPage} onPageChanged={onPageChanged} portionSize={5}/>
        {
            users.map((u: TUser) => <User follow={followUser}
                                                followingInProgress={followingInProgress}
                                                unfollow={unfollowUser}
                                                user={u}
                                                key={u.id}
            />)
        }
    </div>
};

export default Users
