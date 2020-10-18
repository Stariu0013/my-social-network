import React from 'react';
import {addNewPostActionCreator} from "../../../redux/profile-reducer";
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
        addNewPost: text => {
            dispatch(addNewPostActionCreator(text));
        }
    }
};

let MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
