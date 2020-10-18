import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {requiredField} from "../../utils/validators/validator";

const LoginForm = props => {
  return (
      <form onSubmit={props.handleSubmit}>
          <div><Field type="text" name={"Login"}
                      validate={[requiredField]}
                      placeholder="Login"
                      component={Input}/></div>
          <div><Field type="text" name={"Password"}
                      validate={[requiredField]}
                      placeholder="Password"
                      component={Input}/></div>
          <div><label><Field name={'rememberMe'} type="checkbox" component={Input}/> Remember me</label></div>
          <div><button>Log in</button></div>
      </form>
  )
};

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm);

const Login = () => {

    const onSubmit = formData => {
        console.log(formData);
    };

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};

export default Login;
