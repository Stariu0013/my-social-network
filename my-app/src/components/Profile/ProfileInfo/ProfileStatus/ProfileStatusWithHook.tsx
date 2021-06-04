import React, {ChangeEvent, useEffect, useState} from 'react';

type TProfileStatusWithHookProps = {
    status: string;

    updateStatus: (status: string) => void;
}

const ProfileStatusWithHook: React.FC<TProfileStatusWithHookProps> = props => {

    const [ editMode, setEditMode ] = useState<boolean>(false);
    const [ status, setStatus ] = useState<string>(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
