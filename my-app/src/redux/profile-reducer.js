const ADD_NEW_POST = "ADD-NEW-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const profileReducer = (state, action) => {
    switch (action.type) {
        case ADD_NEW_POST:
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            state.postData.push(newPost);
            state.newPostText = '';
            return state;
        case UPDATE_NEW_POST_TEXT:
            state.newPostText = action.postText;
            return state;
        default:
            return state;
    }
};

export const addNewPostActionCreator = () => {
    return {
        type: "ADD-NEW-POST"
    }
};

export const updateNewPostChangeActionCreator = text => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        postText: text
    }
};

export default profileReducer;
