import React from 'react';
import s from './Post.module.css';

const Post = props => {
    return(
        <div className={s.item + " " + s.post}>
            <img src="https://pics.me.me/thumb_bongo-cat-piano-cat-smack-cat-trumpet-meme-animation-meme-51340626.png" alt=""/>
            <span>{props.message}</span>
            <div>Like - {props.likeCount}</div>
        </div>
    )
}

/*
class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return(
            <div className={s.item + " " + s.post}>
                <img src="https://pics.me.me/thumb_bongo-cat-piano-cat-smack-cat-trumpet-meme-animation-meme-51340626.png" alt=""/>
                <span>{this.props.message}</span>
                <div>Like - {this.props.likeCount}</div>
            </div>
        )
    }
}
*/
export default Post;
