const ADD_NEW_POST = "ADD-NEW-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
    postData: [
        {id: 1, message: 'Hello, there', likesCount: 15},
        {id: 1, message: 'What is up?', likesCount: 20}
    ],
    newPostText: 'Share your news'
};

const profileReducer = (state = initialState, action) => {
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
