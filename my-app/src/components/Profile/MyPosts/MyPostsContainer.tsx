import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {TAppState} from "../../../redux/redux-store";

const mapStateToProps = (state: TAppState) => {

    return {
        posts: state.profilePage.postData,
    };
};

const MyPostsContainer = connect(mapStateToProps, {addNewPost: actions.addNewPost})(MyPosts);

export default MyPostsContainer;
