import React from "react";
import {createField, Input, Textarea} from "../../common/FormControls/FormControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit, profile}) => {
  return <form onSubmit={handleSubmit}>
    <button>Save</button>
    <div>
      <span>{profile.fullName}</span>
      {createField('text', 'fullName', [], 'Full name', Input)}
    </div>
    <div>
      {createField('text', 'aboutMe', [], 'About me', Input)}
    </div>
    <div>
      Looking for a job -
      {createField('checkbox', 'lookingForAJob', [], '', Input)}
    </div>
    <div>
      {createField('text', 'lookingForAJobDescription', [], 'Looking for a job description', Textarea)}
    </div>

    {Object.keys(profile.contacts).map(contact => {
      return <div>
        <b>{contact}</b>: {profile.contacts[contact]}
        {createField('text', 'contacts.' + contact, [], contact, Input)}
      </div>
    })}
  </form>
};

const ProfileDataReduxForm = reduxForm({
  form: 'profileData',
})(ProfileDataForm);

export default ProfileDataReduxForm;
