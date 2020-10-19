import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {requiredField} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormControls/FormControls.module.css'

const LoginForm = props => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div><Field type="text" name="login"
                      validate={[requiredField]}
                      placeholder="Login"
                      component={Input}/></div>
          <div><Field type="password" name="password"
                      validate={[requiredField]}
                      placeholder="Password"
                      component={Input}/></div>
          <div><label><Field name='rememberMe' type="checkbox" component={Input}/> Remember me</label></div>
          {props.error && <div className={style.summuryError}>{props.error}</div>}
          <div><button>Log in</button></div>
      </form>
  )
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = props => {
    const onSubmit = formData => {
        let { login, password, rememberMe } = formData;
        props.login(login, password, rememberMe);
    };

    if(props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);
