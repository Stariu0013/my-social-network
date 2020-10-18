import React from 'react';
import styles from './FormControls.module.css'

const FormControl = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error;
    return <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
        <div>
            {props.children}
        </div>
        {hasError && <span>{meta.error}</span>}
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
