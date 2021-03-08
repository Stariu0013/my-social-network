import React from 'react';
import Users from "./Users";
import {
    follow,
    unfollow, requestUsers
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getUsers,
    getUsersTotalCount,
} from "../../selectors/user-selector";
import {TAppState} from "../../redux/redux-store";
import {UserType} from "../../types/types";

type TMapStateProps = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalItemsCount: number,
    users: UserType[],
    followingInProgress: number[],
}

type TMapDispatchProps = {
    unfollow: (id: number) => void,
    follow: (id: number) => void,
    getUsers: (currentPage: number, pageSize: number) => void
}

type TUsersContainer = TMapStateProps & TMapDispatchProps;

class UsersContainer extends React.Component<TUsersContainer> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    };
    render = () => {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users pageSize={this.props.pageSize}
                   totalItemsCount={this.props.totalItemsCount}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: TAppState): TMapStateProps => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getUsersTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

export default compose(
    connect<TMapStateProps, TMapDispatchProps, {}, TAppState>(mapStateToProps,
        {follow, unfollow,getUsers: requestUsers})
)(UsersContainer);


