import React from 'react';
import {addNewPostActionCreator, updateNewPostChangeActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = state => {
  return {
      newPostText: state.profilePage.newPostText,
      posts: state.profilePage.postData
  }
};

let mapDispatchToProps = dispatch => {
    return {
        onPostChange: text => {
            dispatch(updateNewPostChangeActionCreator(text));
        },
        addNewPost: () => {
            dispatch(addNewPostActionCreator());
        }
    }
};

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
