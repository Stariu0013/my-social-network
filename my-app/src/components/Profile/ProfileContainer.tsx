import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, savePhotos, updateProfile, updateStatus, userProfileById} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/redirectHOC";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.loggedUserId;
            if(!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.userProfileById(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render = () => {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}
                         status={this.props.status}
                         isOwner={!this.props.match.params.userId}
                         savePhoto={this.props.savePhotos}
                         updateProfile={this.props.updateProfile}
                         updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

let mapStateToProps = state => {
  return {
      profile: state.profilePage.profile,
      status: state.profilePage.status,
      loggedUserId: state.auth.id,
  }
};

export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {userProfileById, getStatus, updateStatus, savePhotos, updateProfile})
)(ProfileContainer);
