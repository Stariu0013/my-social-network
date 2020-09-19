import React from 'react';
import {addNewPostActionCreator, updateNewPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";

const MyPostsContainer = props => {

    let state = props.store.getState().profilePage;

    const addNewPost = () => {
        props.store.dispatch(addNewPostActionCreator());
    };

    const onPostChange = text => {
        props.store.dispatch(updateNewPostChangeActionCreator(text));
    };

    return (<MyPosts addNewPost={addNewPost}
                     onPostChange={onPostChange}
                     posts={state.postData}
                     newPostText={state.newPostText}
    />)
}
export default MyPostsContainer;
