import React from 'react';
import Users from "./Users";
import { useSelector } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import { getIsFetching } from "../../selectors/user-selector";

export const UsersPage = () => {
    const isFetching = useSelector(getIsFetching);

    return <>
        { isFetching ? <Preloader/> : null }
        <Users />
    </>
}

