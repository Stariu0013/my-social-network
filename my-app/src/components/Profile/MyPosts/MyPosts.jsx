import React from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css'
import {addNewPostActionCreator, updateNewPostChangeActionCreator} from "../../../redux/profile-reducer";

const MyPosts = props => {

    const newPostElement = React.createRef();

    const addNewPost = () => {
        props.dispatch(addNewPostActionCreator());
    };

    const postsElem = props.postData
        .map(post => <Post message={post.message} likeCount={post.likesCount}/>)

    const onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch(updateNewPostChangeActionCreator(text));
    };

    return (
        <div className={s.posts}>
            <h4>My posts</h4>
            <div>
                New post
            </div>
            <textarea cols="15" rows="4" ref={newPostElement} onChange={onPostChange} value={props.newPostText}/>
            <div>
                <button onClick={addNewPost}>Post</button>
            </div>
            {postsElem}
        </div>
    )
}
export default MyPosts;
