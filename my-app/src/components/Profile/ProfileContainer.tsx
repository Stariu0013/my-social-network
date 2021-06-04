import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, savePhotos, updateProfile, updateStatus, userProfileById} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {TProfile} from "../../types/types";
import {TAppState} from "../../redux/redux-store";

type TProfileContainerProps = {
    profile: TProfile;
    status: string;
    loggedUserId: number;

    userProfileById: (userId: number) => void;
    getStatus: (userId: number) => void;
    updateStatus: (status: string) => void;
    savePhotos: (file: File) => void;
    updateProfile: (profile: TProfile) => void;
}
type TRouteProps = {
    userId: string;
}

type PropsType = TProfileContainerProps & RouteComponentProps<TRouteProps>

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.loggedUserId;
            if (!userId) {
                console.warn('No such user');
                this.props.history.push('/login');
            }
            else {
                this.props.userProfileById(userId);
                this.props.getStatus(userId);
            }
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: {}) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
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
        );
    }
}

let mapStateToProps = (state: TAppState) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        loggedUserId: state.auth.id,
    };
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {userProfileById, getStatus, updateStatus, savePhotos, updateProfile}),
    withRouter
)(ProfileContainer);
