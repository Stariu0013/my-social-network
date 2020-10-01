import React from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css'

const MyPosts = props => {
    let newPostElement = React.createRef();

    const addNewPost = () => {
        props.addNewPost();
    };

    let postsElem = props.posts
        .map(post => <Post message={post.message} likeCount={post.likesCount}/>);

    const onPostChange = () => {
        let text = newPostElement.current.value;
        props.onPostChange(text);
    };
    return <div className={s.posts}>
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

};

/*
class MyPosts extends React.Component {s
    constructor(props) {
        super(props);
    }

    newPostElement = React.createRef();

    addNewPost = () => {
        this.props.addNewPost();
    };

    postsElem = this.props.posts
        .map(post => <Post message={post.message} likeCount={post.likesCount}/>);

    onPostChange = () => {
        let text = this.newPostElement.current.value;
        this.props.onPostChange(text);
    }

    render = () => {
        return <div className={s.posts}>
            <h4>My posts</h4>
            <div>
                New post
            </div>
            <textarea cols="15" rows="4" ref={this.newPostElement} onChange={this.onPostChange} value={this.props.newPostText}/>
            <div>
                <button onClick={this.addNewPost}>Post</button>
            </div>
            {this.postsElem}
        </div>
    }
}
*/
export default MyPosts;
