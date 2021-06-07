import profileReducer, { actions } from "./profile-reducer";

let state = {
    postData: [
        {id: '1', message: 'Hello, there', likesCount: 15},
        {id: '2', message: 'What is up?', likesCount: 20}
    ]
};

it('length of posts should be incremented', () => {
    // 1. test data
    let action = actions.addNewPost('Hello, there');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. expectation
    expect(newState.postData.length).toBe(3);
});

it('message of new post should be correct', () => {
    let action = actions.addNewPost("Hello, there");

    let newState = profileReducer(state, action);

    expect(newState.postData[2].message).toBe("Hello, there");
});

it('delete post by id', () => {
    let action = actions.deletePost('2');

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(1);
});

it(`Array shouldn't be changes because wrong userID`, () => {
    let action = actions.deletePost('10000');

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(2);
});
