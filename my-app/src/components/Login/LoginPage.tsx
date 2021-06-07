import React from 'react';
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormControls/FormControls";
import { requiredField } from "../../utils/validators/validator";
import { useDispatch, useSelector } from "react-redux";
import { login} from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from './../common/FormControls/FormControls.module.css'
import { TAppState } from "../../redux/redux-store";

type TLoginFormProps = {
    captchaUrl: string | null,
}

type TFormDataKeys = Extract<keyof TFormData, string>

const LoginForm: React.FC<InjectedFormProps<TFormData, TLoginFormProps> &  TLoginFormProps> = ({handleSubmit, error, captchaUrl}) => {
  return (
      <form onSubmit={handleSubmit}>
          {createField<TFormDataKeys>("text", "login", [requiredField], "Login", Input)}
          {createField<TFormDataKeys>("password", "password", [requiredField], "Password", Input)}
          {createField<TFormDataKeys>(void 0, "rememberMe", void 0, "Password", Input,{type: "checkbox"},"Remember me")}

          {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
          {captchaUrl && createField<TFormDataKeys>("text", "captcha", [requiredField], "Symbols from image", Input)}

          {error && <div className={style.summuryError}>{error}</div>}
          <div><button>Log in</button></div>
      </form>
  );
};

const LoginReduxForm = reduxForm<TFormData, TLoginFormProps>({
    form: 'login',
})(LoginForm);

type TFormData = {
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
}

export const LoginPage: React.FC = () => {
    const isAuth = useSelector((state: TAppState) => state.auth.isAuth);
    const captcha = useSelector((state: TAppState) => state.auth.captchaUrl);
    const dispatch = useDispatch();

    const onSubmit = (formData: TFormData) => {
        const { login: formLogin, password: formPassword, rememberMe: formRememberMe, captcha: formCaptcha} = formData;

        dispatch(login(formLogin, formPassword, formRememberMe, formCaptcha));
    };

    if (isAuth) {
        return <Redirect to="/profile"/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm captchaUrl={captcha} onSubmit={onSubmit}/>
    </div>
};
