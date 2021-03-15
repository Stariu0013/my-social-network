import React from 'react';
import styles from './FormControls.module.css'
import {Field} from "redux-form";

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
};

export const Textarea = props => {
    let {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}></textarea></FormControl>
};

export const Input = props => {
    let {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}></input></FormControl>
};

export const createField = (
    type,
    name,
    validators,
    placeholder,
    component,
    props,
    text = "",
) => {
    return <div>
        <Field type={type} name={name}
               validate={validators}
               placeholder={placeholder}
               component={component}
               {...props}
        /> {text}
    </div>
};
