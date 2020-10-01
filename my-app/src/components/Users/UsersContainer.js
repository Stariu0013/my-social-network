import React from 'react';
import Users from "./Users";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    unfollow,
    toggleIsFetching
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {getUsers} from "../../api/auth/auth-api";

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.toggleIsFetching(true);
        getUsers(this.props.currentPage, this.props.pageSize)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount > 100 ? response.data.totalCount = 100 : response.data.totalCount);
            })
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
            getUsers(pageNumber, this.props.pageSize)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items)
            })
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
        isFetching: state.usersPage.isFetching
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

export default connect(mapStateToProps, {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})
(UsersContainer);
