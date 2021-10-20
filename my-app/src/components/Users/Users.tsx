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
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type QuerySearch = {
    term?: string,
    friend?: string,
    page?: string,
}

const Users: React.FC = (props) => {
    const pageSize = useSelector(getPageSize);
    const totalItemsCount = useSelector(getUsersTotalCount);
    const currentPage = useSelector(getCurrentPage);
    const users = useSelector(getUsers);
    const followingInProgress = useSelector(getFollowingInProgress);
    const filter = useSelector(getFilter);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1));

        const actualPage = parsed.page ? +parsed.page : currentPage;
        let actualFilter = parsed.term ? { ...filter, term: parsed.term as string } : filter;

        switch (parsed.friend) {
            case 'null': {
                actualFilter = { ...actualFilter, friend: null};

                break;
            }
            case 'true': {
                actualFilter = { ...actualFilter, friend: true};

                break;
            }
            case 'false': {
                actualFilter = { ...actualFilter, friend: false};

                break;
            }
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const query: QuerySearch = {};

        if (filter.term) {
            query.term = filter.term;
        }

        if (filter.friend) {
            query.friend = String(filter.friend);
        }

        if (currentPage !== 1) {
            query.page = String(currentPage);
        }

        history.push({
            pathname: '/users',
            search: queryString.stringify(query),
        });
    }, [filter, currentPage]);

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
