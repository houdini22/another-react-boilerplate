import * as React from 'react'
import { selectors as usersSelectors, actions as usersActions } from '../reducers/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthManager } from './AuthManager'
import { selectors as commonSelectors } from '../reducers/roles'

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
}

class UsersManagerBase extends React.Component<UsersManagerProps, null> {
    state = {
        newUserRoles: [],
        newUserPermissions: [],
        newRolePermissions: [],
        newRoleUsers: [],
        newPermissionUsers: [],
    }

    componentDidMount() {
        const {
            fetchOne,
            id,
            roleId,
            permissionId,
            fetch,
            fetchRoles,
            fetchRole,
            fetchPermissions,
            getRoles,
            getPermissions,
            fetchPermission,
            getUsers,
        } = this.props
        if (id) {
            fetchOne(id)
        }

        if (getUsers) {
            fetch()
        }

        if (getRoles) {
            fetchRoles()
        }

        if (getPermissions) {
            fetchPermissions()
        }

        if (roleId) {
            fetchRole(roleId)
        }

        if (permissionId) {
            fetchPermission(permissionId)
        }
    }

    addPermissionToNewUser(id) {
        const { newUserPermissions } = this.state

        const newPermissions = [...newUserPermissions]
        newPermissions.push(id)

        this.setState({ newUserPermissions: newPermissions })
    }

    removePermissionFromNewUser(id) {
        const { newUserPermissions } = this.state

        const newPermissions = [...newUserPermissions].filter(({ id: _id }) => {
            return Number(id) !== Number(_id)
        })

        this.setState({ newUserPermissions: newPermissions })
    }

    addRoleToNewUser(id) {
        const { newUserRoles } = this.state

        const newRoles = [...newUserRoles]
        newRoles.push(id)

        this.setState({ newUserRoles: newRoles })
    }

    removeRoleFromNewUser(id) {
        const { newUserRoles } = this.state

        const newRoles = [...newUserRoles].filter(({ id: _id }) => {
            return Number(id) !== Number(_id)
        })

        this.setState({ newUserRoles: newRoles })
    }

    addPermissionToNewRole(id) {
        const { newRolePermissions } = this.state

        const newPermissions = [...newRolePermissions]
        newPermissions.push(id)

        this.setState({ newRolePermissions: newPermissions })
    }

    removePermissionFromNewRole(id) {
        const { newRolePermissions } = this.state

        const newPermissions = [...newRolePermissions].filter(({ id: _id }) => {
            return Number(id) !== Number(_id)
        })

        this.setState({ newRolePermissions: newPermissions })
    }

    addNewRoleToUser(id) {
        const { newRoleUsers } = this.state

        const newUsers = [...newRoleUsers]
        newUsers.push(id)

        this.setState({ newRoleUsers: newUsers })
    }

    removeNewRoleFromUser(id) {
        const { newRoleUsers } = this.state

        const newUsers = [...newRoleUsers].filter(({ id: _id }) => {
            return Number(id) !== Number(_id)
        })

        this.setState({ newRoleUsers: newUsers })
    }

    addNewPermissionToUser(id) {
        const { newPermissionUsers } = this.state

        const newUsers = [...newPermissionUsers]
        newUsers.push(id)

        this.setState({ newPermissionUsers: newUsers })
    }

    removeNewPermissionFromUser(id) {
        const { newPermissionUsers } = this.state

        const newUsers = [...newPermissionUsers].filter(({ id: _id }) => {
            return Number(id) !== Number(_id)
        })

        this.setState({ newPermissionUsers: newUsers })
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
            deleteAvatar,
            role,
            roles,
            permissions,
            permission,
            deleteUserPermission,
            fetchPermissions,
            addUserPermission,
            deleteRolePermission,
            fetchRole,
            addPermission,
            addRole,
        } = this.props
        const { newUserRoles, newUserPermissions, newRoleUsers, newPermissionUsers, newRolePermissions } = this.state
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
            newUserPermissions,
            role,
            roles,
            permissions,
            permission,
            addPermissionToNewRole: this.addPermissionToNewRole.bind(this),
            removePermissionFromNewRole: this.removePermissionFromNewRole.bind(this),
            addNewRoleToUser: this.addNewRoleToUser.bind(this),
            removeNewRoleFromUser: this.removeNewRoleFromUser.bind(this),
            addNewPermissionToUser: this.addNewPermissionToUser.bind(this),
            removeNewPermissionFromUser: this.removeNewPermissionFromUser.bind(this),
            newRoleUsers,
            newPermissionUsers,
            newRolePermissions,
            deleteUserPermission,
            fetchPermissions,
            addUserPermission,
            deleteRolePermission,
            fetchRole,
            addPermission,
            addRole,
        }

        return (
            <>
                <AuthManager>{() => <>{children(renderProps)}</>}</AuthManager>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    users: usersSelectors['getUsers'](state),
    user: usersSelectors['getUser'](state),
    isLoading: usersSelectors['getIsLoading'](state),
    uploadProgress: usersSelectors['getUploadProgress'](state),
    roles: usersSelectors['getRoles'](state),
    role: usersSelectors['getRole'](state),
    permissions: usersSelectors['getPermissions'](state),
    permission: usersSelectors['getPermission'](state),
})

const UsersManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            fetch: usersActions.fetch,
            fetchOne: usersActions.fetchOne,
            setIsLoading: usersActions.setIsLoading,
            editUser: usersActions.editUser,
            addUser: usersActions.addUser,
            deleteUser: usersActions.deleteUser,
            deleteUserRole: usersActions.deleteUserRole,
            addUserRole: usersActions.addUserRole,
            sendActivationEmail: usersActions.sendActivationEmail,
            sendAvatar: usersActions.sendAvatar,
            forceLogin: usersActions.forceLogin,
            setUploadProgress: usersActions.setUploadProgress,
            activateUser: usersActions.activateUser,
            deactivateUser: usersActions.deactivateUser,
            deleteAvatar: usersActions.deleteAvatar,
            fetchRole: usersActions.fetchRole,
            editRole: usersActions.editRole,
            addRole: usersActions.addRole,
            deleteRole: usersActions.deleteRole,
            addPermission: usersActions.addPermission,
            fetchPermissions: usersActions.fetchPermissions,
            deleteRolePermission: usersActions.deleteRolePermission,
            deletePermission: usersActions.deletePermission,
            fetchPermission: usersActions.fetchPermission,
            editPermission: usersActions.editPermission,
            addUserPermission: usersActions.addUserPermission,
            deleteUserPermission: usersActions.deleteUserPermission,
            fetchRoles: usersActions.fetchRoles,
        },
        dispatch,
    )
})(UsersManagerBase)

export { UsersManager }
