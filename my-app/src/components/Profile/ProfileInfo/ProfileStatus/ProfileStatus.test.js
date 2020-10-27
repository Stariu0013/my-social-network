import React from 'react';
import {create} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="Hello, there"/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("Hello, there");
    });
    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="Hello, there"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status="Hello, there"/>);
        const root = component.root;
        expect(() => {
            const input = root.findByType("input");
        }).toThrow();
    });
    test("after creation <span> should contain correct status", () => {
        const component = create(<ProfileStatus status="Hello, there"/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("Hello, there");
    });
    test("<input> should be displayed instead <span> in editMode", () => {
        const component = create(<ProfileStatus status="Hello, there"/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        expect(input.props.value).toBe("Hello, there");
    });
    test("component callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Hello, there" updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });

});
