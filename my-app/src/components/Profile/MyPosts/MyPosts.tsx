import React from 'react';
import Post from "./Post/Post";
import s from './MyPosts.module.css'
import {InjectedFormProps, reduxForm} from "redux-form";
import {fieldMaxLength, requiredField} from "../../../utils/validators/validator";
import {createField, Textarea} from "../../common/FormControls/FormControls";
import {TPostData} from "../../../redux/profile-reducer";
import {ExtractString} from "../../../redux/redux-store";

const maxLength = fieldMaxLength(15);

type TMyPosts = {
    posts: Array<TPostData>;

    addNewPost: (message: string) => void;
}
type TAddNewPostKeys = {
    newPostField: string;
}
type TAddNewPostKeysExtracted = ExtractString<TAddNewPostKeys>;

const MyPosts: React.FC<TMyPosts> = props => {
    const addNewPost = (value: TAddNewPostKeys) => {
        props.addNewPost(value.newPostField);
        value.newPostField = '';
    };

    const postsElem = props.posts
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

const AddNewPostFrom: React.FC<InjectedFormProps<TAddNewPostKeys>> = props => {

    return(
        <form onSubmit={props.handleSubmit}>
            {createField<TAddNewPostKeysExtracted>("text", "newPostField", [requiredField, maxLength], "Post message", Textarea)}
            <div>
                <button>
                    Add new post
                </button>
            </div>
        </form>
    )
};

const AddNewReduxPostFrom = reduxForm<TAddNewPostKeys, {}>({form: "addNewPost"})(AddNewPostFrom);

export default MyPosts;
