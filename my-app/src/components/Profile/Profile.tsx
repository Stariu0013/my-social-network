import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { TProfile } from "../../types/types";

type TProfileProps = {
    isOwner: boolean;
    status: string;
    profile: TProfile;

    updateProfile : (profile: TProfile) => void;
    updateStatus: (status: string) => void;
    savePhoto: (photos: File) => void;
}

class Profile extends React.Component<TProfileProps> {

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
        );
    };
}

export default Profile;
