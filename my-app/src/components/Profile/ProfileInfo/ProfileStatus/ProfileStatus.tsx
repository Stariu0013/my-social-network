import React, {ChangeEvent} from 'react';

type TProfileStatusProps = {
    status: string;

    updateStatus: (status: string) => void;
}

type TProfileStatusState = {
    editMode: boolean;
    status: string;
}

class ProfileStatus extends React.Component<TProfileStatusProps, TProfileStatusState> {
    state = {
        editMode: false,
        status: this.props.status,
    };

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value,
        });
    };

    activateEditMode = () => {
        this.setState({
            editMode: true,
        });
    };

    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });

        this.props.updateStatus(this.state.status);
    };

    componentDidUpdate(prevProps: TProfileStatusProps, prevState: TProfileStatusState) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status,
            });
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || '-----'}</span>
                </div>}

                {this.state.editMode &&
                <div>
                    <input type="text" onChange={this.onStatusChange}
                           autoFocus={true}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>}
            </div>
        )
    }
}

export default ProfileStatus;
