import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, updateStatus, userProfileById} from "../../redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/redirectHOC";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = 7177;
        }

        this.props.userProfileById(userId);
        this.props.getStatus(userId);
    }

    render = () => {
        if(!this.props.isAuth) return <Redirect to={'/login'}/>;
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

let mapStateToProps = state => {
  return {
      profile: state.profilePage.profile,
      status: state.profilePage.status
  }
};

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {userProfileById, getStatus, updateStatus})
)(ProfileContainer);
