import React, {useEffect, useState} from 'react';

const ProfileStatusWithHook = props => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    const activateEditMode = () => {
      setEditMode(true);
    };
 
    const deactivateEditMode = () => {
      setEditMode(false);
      props.updateStatus(status);
    };

    return(
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}>{ props.status || '-----' }</span>
            </div>}

            { editMode &&
            <div>
                <input type="text"
                       autoFocus={true}
                       onBlur={deactivateEditMode}
                       onChange={onStatusChange}
                       value={status}/>
            </div>}
        </div>
    )

}

export default ProfileStatusWithHook;
