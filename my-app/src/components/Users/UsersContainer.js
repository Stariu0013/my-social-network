import React from 'react';
import Users from "./Users";
import {
    follow,
    setCurrentPage,
    setUsers,
    unfollow,
    toggleFollowingProgress, requestUsers
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

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
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
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
            />
        </>
    }
}

let mapStateToProps = state => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getUsersTotalCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

/*let mapDispatchToProps = dispatch => {
  return {
      follow: userId => {
          dispatch(followAC(userId))
      },
      unfollow: userId => {
          dispatch(unfollowAC(userId))
      },
      setUsers: users  => {
          dispatch(setUsersAC(users))
      },
      setCurrentPage: pageNumber => {
          dispatch(setCurrentPageAC(pageNumber))
      },
      setTotalUsersCount: count => {
          dispatch(setUsersTotalCountAC(count))
      },
      toggleIsFetching: isFetching => {
          dispatch(toggleIsFetchingAC(isFetching))
      }
  }
};*/

export default compose(
    connect(mapStateToProps, {follow, unfollow, setUsers,
        setCurrentPage,
        toggleFollowingProgress,getUsers: requestUsers})
)(UsersContainer);


