import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = props => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts postData={props.data.postData}
                     newPostText={props.data.newPostText}
                     dispatch={props.dispatch}
            />
        </div>
    )
};

export default Profile;
