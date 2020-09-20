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
        case ADD_NEW_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            let copiedState = {...state};
            copiedState.postData = [...state.postData];
            copiedState.postData.push(newPost);
            copiedState.newPostText = '';
            return copiedState;
        }
        case UPDATE_NEW_POST_TEXT:{
            let copiedState = {...state};
            copiedState.newPostText = action.postText;
            return copiedState;
        }
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
