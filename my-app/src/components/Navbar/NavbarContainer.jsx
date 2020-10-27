import React from 'react';
import {connect} from "react-redux";
import Navbar from "./Navbar";

let mapStateToProps = state => {
    return {
        friends: state.sidebar.friends
    }
};

let mapDispatchToProps = () => {
    return {

    }
};

let NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarContainer;
