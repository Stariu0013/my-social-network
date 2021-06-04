import React from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css'
import {Field, reduxForm} from "redux-form";
import {fieldMaxLength, requiredField} from "../../../utils/validators/validator";
import {Textarea} from "../../common/FormControls/FormControls";


const maxLength = fieldMaxLength(15);
const MyPosts = props => {
    const addNewPost = value => {
        props.addNewPost(value.newPostField);
        value.newPostField = '';
    };

    let postsElem = props.posts
        .map(post => <Post key={post.id} message={post.message} likeCount={post.likesCount}/>);

    return <div className={s.posts}>
        <h4>My posts</h4>
        <div>
            New post
        </div>
        <AddNewReduxPostFrom onSubmit={addNewPost}/>
        {postsElem}
    </div>
};

const AddNewPostFrom = props => {
    return(
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name="newPostField" validate={[requiredField, maxLength]}/>
            <div>
                <button>
                    Add new post
                </button>
            </div>
        </form>
    )
};

const AddNewReduxPostFrom = reduxForm({form: "addNewPost"})(AddNewPostFrom);

export default MyPosts;
