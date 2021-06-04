import React from "react";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {TContacts, TProfile} from "../../../types/types";
import {ExtractString} from "../../../redux/redux-store";

type TProfileDataFormProps = {
    profile: TProfile;
}

type TProfileData = {
    fullName: string;
    aboutMe: string;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
}

type TProfileDataKeys = ExtractString<TProfileData>

const ProfileDataForm: React.FC<InjectedFormProps<TProfile
    , TProfileDataFormProps>
    & TProfileDataFormProps
    > = ({
        handleSubmit,
        profile
    }) => {
    return <form onSubmit={handleSubmit}>
        <button>Save</button>
        <div>
            <span>{profile.fullName}</span>
            {createField<TProfileDataKeys>('text', 'fullName', [], 'Full name', Input)}
        </div>
        <div>
            {createField<TProfileDataKeys>('text', 'aboutMe', [], 'About me', Input)}
        </div>
        <div>
            Looking for a job -
            {createField<TProfileDataKeys>('checkbox', 'lookingForAJob', [], '', Input)}
        </div>
        <div>
            {createField<TProfileDataKeys>('text', 'lookingForAJobDescription', [], 'Looking for a job description', Textarea)}
        </div>

        {Object.keys(profile.contacts).map(contact => {
            return <div>
                <b>{contact}</b>: {profile.contacts[contact as keyof TContacts]}
                {createField('text', 'contacts.' + contact, [], contact, Input)}
            </div>
        })}
    </form>
};

const ProfileDataReduxForm = reduxForm<TProfile, TProfileDataFormProps>({
    form: 'profileData',
})(ProfileDataForm);

export default ProfileDataReduxForm;
