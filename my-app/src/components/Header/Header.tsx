import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {isUserAuthSelector, userLoginSelector} from "../../selectors/auth-selector";
import {logout} from "../../redux/auth-reducer";

import {Avatar, Button, Col, Menu, Row, Layout} from "antd";
import {UserOutlined} from "@ant-design/icons";

const { Header } = Layout;

const AppHeader: React.FC = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isUserAuthSelector);
    const login = useSelector(userLoginSelector);

    const logoutCb = () => {
        dispatch(logout());
    };

    return (
        <Header className="header">
            <div className="logo"/>
            <Row>
                <Col span={18}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
                    </Menu>
                </Col>
                {
                    isAuth
                        ? <>
                            <Col span={1}>
                                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                            </Col>
                            <Col span={5}>
                                <div>{login}<Button onClick={logoutCb}>Logout</Button></div>
                            </Col>
                        </>
                        : <Col span={6}>
                            <Link to='/login'>Login</Link>
                        </Col>
                }
            </Row>
        </Header>
    );
}

export default AppHeader;
