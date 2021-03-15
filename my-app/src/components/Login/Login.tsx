import React from 'react';
import {reduxForm} from "redux-form";
import {createField, Input} from "../common/FormControls/FormControls";
import {requiredField} from "../../utils/validators/validator";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from './../common/FormControls/FormControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return (
      <form onSubmit={handleSubmit}>
          {createField("text", "login", [requiredField], "Login", Input)}
          {createField("password", "password", [requiredField], "Password", Input)}
          {createField(null, "rememberMe", null, "Password", Input,{type: "checkbox"},"Remember me")}

          {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
          {captchaUrl && createField("text", "captcha", [requiredField], "Symbols from image", Input)}

          {error && <div className={style.summuryError}>{error}</div>}
          <div><button>Log in</button></div>
      </form>
  )
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = props => {
    const onSubmit = formData => {
        let { login, password, rememberMe, captcha} = formData;
        props.login(login, password, rememberMe, captcha);
    };

    if(props.isAuth) {
        return <Redirect to="/profile"/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm captchaUrl={props.captcha} onSubmit={onSubmit}/>
    </div>
};

const mapStateToProps = state => ({
    captcha: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);
