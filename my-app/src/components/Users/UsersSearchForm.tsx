import React from "react";
import {Field, Formik} from "formik";
import {TFilter} from "../../redux/users-reducer";
import {getFilter} from "../../selectors/user-selector";
import {useSelector} from "react-redux";

type FriendFormType = 'null' | 'true' | 'false';
type UsersSearchFormValues = {
    term: string;
    friend: FriendFormType;
}
type UsersSearchFormProps = {
    onFilterChange: (filter: TFilter) => void,
}
export const UsersSearchForm: React.FC<UsersSearchFormProps> = React.memo((props) => {

    const filter = useSelector(getFilter);

    const validator = () => {
        const errors = {};

        return errors;
    }

    return <div>
        <Formik
            enableReinitialize
            initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType}}
            validate={validator}
            onSubmit={(values: UsersSearchFormValues, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
                const filter: TFilter = {
                    term: values.term,
                    friend: values.friend === 'null' ? null : values.friend === 'true',
                }

                props.onFilterChange(filter);
                setSubmitting(false);
            }}
        >
            {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="term"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.term}
                    />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">All followed</option>
                        <option value="false">All unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </form>
            )}
        </Formik>
    </div>
});
