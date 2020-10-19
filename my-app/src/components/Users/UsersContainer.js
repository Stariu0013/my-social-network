import React from 'react';
import Users from "./Users";
import {
    follow,
    setCurrentPage,
    setUsers,
    unfollow,
    toggleFollowingProgress, getUsers
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/redirectHOC";
import {compose} from "redux";

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
                   usersTotalCount={this.props.usersTotalCount}
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersTotalCount: state.usersPage.usersTotalCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
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
        toggleFollowingProgress,getUsers})
)(UsersContainer);


