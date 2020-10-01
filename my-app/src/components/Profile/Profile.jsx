import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => {
        return (
            <div>
                <ProfileInfo profile={this.props.profile}/>
                <MyPostsContainer />
            </div>
        )
    }
}

export default Profile;
