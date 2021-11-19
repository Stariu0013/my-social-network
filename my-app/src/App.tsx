
import React from 'react';
import {BrowserRouter, NavLink, Redirect, Route, withRouter} from "react-router-dom";

import { LoginPage } from "./components/Login/LoginPage";
import { UsersPage } from "./components/Users/UsersPage";

import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import { withSuspense } from "./hoc/withSuspense";

import store, { TAppState } from "./redux/redux-store";

import { connect, Provider } from "react-redux";
import { compose } from "redux";

// Styles
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb} from 'antd';
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
import Header from "./components/Header/Header";

const { SubMenu } = Menu;
const { Content, Sider} = Layout;

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ChatPage = React.lazy(() => import("./components/Chat/Chat"));
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedChat = withSuspense(ChatPage);

type TAppProps = {
    initialized: boolean;

    initializeApp: () => void;
}

class App extends React.Component<TAppProps> {

    componentDidMount() {
        this.props.initializeApp();
    }

    render = () => {
        if (!this.props.initialized) {
            return <Preloader />;
        }

        return (
            <Layout>
                <Header />
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
                                <Menu.Item key="1"><NavLink to="/profile">Profile</NavLink></Menu.Item>
                                <Menu.Item key="2"><NavLink to="/dialogs">Messages</NavLink></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" icon={<NotificationOutlined />} title="Developers">
                                <Menu.Item key="3"><NavLink to="/users">Users</NavLink></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<NotificationOutlined />} title="Chat">
                                <Menu.Item key="4"><NavLink to="/chat">Chat</NavLink></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <Route exact path='/' render={() => <Redirect to='/profile' />} />
                            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
                            <Route path='/profile/:userId?' render={() => <SuspendedProfile /> } />
                            <Route path='/users' render={() => <UsersPage /> } />
                            <Route path='/chat' render={() => <SuspendedChat /> } />
                            <Route path='/login' render={() => <LoginPage /> } />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    };
}

const mapStateToProps = (state: TAppState) => {
  return {
      initialized: state.app.initialized,
  };
};

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps,{initializeApp}))(App);

const MainApp: React.FC = () => {
    return  <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
};

export default MainApp
