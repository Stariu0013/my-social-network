import {connect} from "react-redux";
import Navbar from "./Navbar";
import {TAppState} from "../../redux/redux-store";

let mapStateToProps = (state: TAppState) => {
    return {
        friends: state.sidebar.friends,
    };
};

let NavbarContainer = connect(mapStateToProps, {})(Navbar);

export default NavbarContainer;
