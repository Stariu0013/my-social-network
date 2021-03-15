import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {updateProfile} from "../../redux/profile-reducer";

class Profile extends React.Component {

    render = () => {
        return (
            <div>
                <ProfileInfo profile={this.props.profile}
                             updateProfile={this.props.updateProfile}
                             isOwner={this.props.isOwner}
                             savePhoto={this.props.savePhoto}
                             status={this.props.status}
                             updateStatus={this.props.updateStatus}/>
                <MyPostsContainer />
            </div>
        )
    }
}

export default Profile;
