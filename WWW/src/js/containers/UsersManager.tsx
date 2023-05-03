import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../reducers/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthManager } from './AuthManager'

interface UsersManagerProps {
    children: any
    fetch: Function
    fetchOne: Function
    users: any
    user: any
    id?: number
    setIsLoading: Function
    editUser: Function
    addUser: Function
    deleteUser: Function
    deleteUserRole: Function
    addUserRole: Function
    sendActivationEmail: Function
    sendAvatar: Function
    uploadProgress: number
    setUploadProgress: Function
    activateUser: Function
    deactivateUser: Function
    addRoleToNewUser: Function
    removeRoleFromNewUser: Function
}

class UsersManagerBase extends React.Component<UsersManagerProps, null> {
    state = {
        newUserRoles: [],
        newUserPermissions: []
    }
    componentDidMount() {
        const { fetchOne, id } = this.props
        if (id) {
            fetchOne(id)
        }
    }

    addPermissionToNewUser(id) {
        const {newUserPermissions} = this.state;

        const newPermissions = [...newUserPermissions];
        newPermissions.push(id);

        this.setState({newUserPermissions: newPermissions});
    }

    removePermissionFromNewUser(id) {
        const {newUserPermissions} = this.state;

        const newPermissions = [...newUserPermissions].filter(({id: _id}) => {
            return Number(id) !== Number(_id);
        });

        this.setState({newUserPermissions: newPermissions});
    }

    addRoleToNewUser(id) {
        const {newUserRoles} = this.state;

        const newRoles = [...newUserRoles];
        newRoles.push(id);

        this.setState({newUserRoles: newRoles});
    }

    removeRoleFromNewUser(id) {
        const {newUserRoles} = this.state;

        const newRoles = [...newUserRoles].filter(({id: _id}) => {
            return Number(id) !== Number(_id);
        });

        this.setState({newUserRoles: newRoles});
    }

    render() {
        const {
            children,
            users,
            setIsLoading,
            user,
            editUser,
            addUser,
            fetch,
            deleteUser,
            deleteUserRole,
            addUserRole,
            fetchOne,
            sendActivationEmail,
            sendAvatar,
            forceLogin,
            uploadProgress,
            setUploadProgress,
            activateUser,
            deactivateUser,
            addRoleToNewUser,
            removeRoleFromNewUser,
            deleteAvatar,
        } = this.props
        const {newUserRoles, newUserPermissions} = this.state;
        const renderProps = {
            users,
            setIsLoading,
            user,
            editUser,
            addUser,
            fetch,
            deleteUser,
            deleteUserRole,
            addUserRole,
            fetchOne,
            sendActivationEmail,
            sendAvatar,
            forceLogin,
            uploadProgress,
            setUploadProgress,
            activateUser,
            deactivateUser,
            addRoleToNewUser: this.addRoleToNewUser.bind(this),
            removeRoleFromNewUser: this.removeRoleFromNewUser.bind(this),
            addPermissionToNewUser: this.addPermissionToNewUser.bind(this),
            removePermissionFromNewUser: this.removePermissionFromNewUser.bind(this),
            deleteAvatar,
            newUserRoles,
            newUserPermissions
        }

        return (
            <>
                <AuthManager>{() => <>{children(renderProps)}</>}</AuthManager>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    users: commonSelectors['getUsers'](state),
    user: commonSelectors['getUser'](state),
    isLoading: commonSelectors['getIsLoading'](state),
    uploadProgress: commonSelectors['getUploadProgress'](state),
})

const UsersManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            fetch: commonActions.fetch,
            fetchOne: commonActions.fetchOne,
            setIsLoading: commonActions.setIsLoading,
            editUser: commonActions.editUser,
            addUser: commonActions.addUser,
            deleteUser: commonActions.deleteUser,
            deleteUserRole: commonActions.deleteUserRole,
            addUserRole: commonActions.addUserRole,
            sendActivationEmail: commonActions.sendActivationEmail,
            sendAvatar: commonActions.sendAvatar,
            forceLogin: commonActions.forceLogin,
            setUploadProgress: commonActions.setUploadProgress,
            activateUser: commonActions.activateUser,
            deactivateUser: commonActions.deactivateUser,
            deleteAvatar: commonActions.deleteAvatar,
        },
        dispatch,
    )
})(UsersManagerBase)

export { UsersManager }
