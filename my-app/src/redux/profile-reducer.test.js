import profileReducer, {addNewPostActionCreator, deletePost} from "./profile-reducer";

let state = {
    postData: [
        {id: 1, message: 'Hello, there', likesCount: 15},
        {id: 2, message: 'What is up?', likesCount: 20}
    ]
};

it('length of posts should be incremented', () => {
    // 1. test data
    let action = addNewPostActionCreator('Hello, there');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.postData.length).toBe(3);
});

it('message of new post should be correct', () => {
    let action = addNewPostActionCreator("Hello, there");

    let newState = profileReducer(state, action);

    expect(newState.postData[2]).toBe("Hello, there");
});

it('delete post by id', () => {
    let action = deletePost(2);

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(1);
});

it(`Array shouldn't be changes because wrong userID`, () => {
    let action = deletePost(10000);

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(2);
});
