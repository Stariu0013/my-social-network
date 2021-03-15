import React from 'react';
import styles from './FormControls.module.css'
import {Field, WrappedFieldProps} from "redux-form";
import {WrappedFieldMetaProps} from "redux-form/lib/Field";
import {TValidators} from "../../../utils/validators/validator";

type TFormControl = {
    meta: WrappedFieldMetaProps,
}

const FormControl: React.FC<TFormControl> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {children}
        </div>
        {hasError && <span>{error}</span>}
    </div>
};

export const Textarea: React.FC<WrappedFieldProps> = props => {
    let {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>
};

export const Input: React.FC<WrappedFieldProps> = props => {
    let {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
};

export function createField<FieldNames extends string>(
    type: string | void,
    name: FieldNames,
    validators: Array<TValidators> | void,
    placeholder: string,
    component: React.FC<WrappedFieldProps>,
    props: {} | void = {},
    text: string = "",
) {
    return <div>
        <Field type={type} name={name}
               validate={validators}
               placeholder={placeholder}
               component={component}
               {...props}
        /> {text}
    </div>
};
