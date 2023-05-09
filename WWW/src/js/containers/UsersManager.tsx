import * as React from 'react'
import { selectors as usersSelectors, actions as usersActions } from '../reducers/users'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthManager } from './AuthManager'
import { Permission, Role, User } from '../../types.d'
import { ifDeepDiff } from '../utils/javascript'

interface UsersManagerProps {
    children: any
    fetch: Function
    fetchOne: Function
    setIsLoading: Function
    editUser: Function
    addUser: Function
    deleteUser: Function
    deleteUserRole: Function
    addUserRole: Function
    sendActivationEmail: Function
    sendAvatar: Function
    forceLogin: Function
    setUploadProgress: Function
    activateUser: Function
    deactivateUser: Function
    deleteAvatar: Function
    fetchRole: Function
    editRole: Function
    addRole: Function
    deleteRole: Function
    addPermission: Function
    fetchPermissions: Function
    deleteRolePermission: Function
    deletePermission: Function
    fetchPermission: Function
    editPermission: Function
    addUserPermission: Function
    deleteUserPermission: Function
    fetchRoles: Function
    users: Array<User>
    user: User
    isLoading: boolean
    uploadProgress: number
    roles: Array<Role>
    role: Role
    permissions: Array<Permissions>
    permission: Permission
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
            setIsLoading,
            getLogsData,
            fetchLogsData,
            logsDataFilters,
        } = this.props
        const promises = []

        setIsLoading(true).then(() => {
            if (id) {
                promises.push(fetchOne(id))
            }

            if (getUsers) {
                promises.push(fetch())
            }

            if (getRoles) {
                promises.push(fetchRoles())
            }

            if (getPermissions) {
                promises.push(fetchPermissions())
            }

            if (roleId) {
                promises.push(fetchRole(roleId))
            }

            if (permissionId) {
                promises.push(fetchPermission(permissionId))
            }

            if (getLogsData) {
                promises.push(fetchLogsData(logsDataFilters))
            }

            Promise.all(promises).then(
                () => {
                    setIsLoading(false)
                },
                () => {
                    setIsLoading(false)
                },
            )
        })
    }

    componentDidUpdate(prevProps: Readonly<UsersManagerProps>, prevState: Readonly<null>, snapshot?: any) {
        const { logsDataFilters, fetchLogsData } = this.props

        if (ifDeepDiff(logsDataFilters, prevProps.logsDataFilters)) {
            fetchLogsData(logsDataFilters)
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

    clearPermissionsFromNewRole() {
        this.setState({ newRolePermissions: [] })
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
            isLoading,
            editRole,
            editPermission,
            fetchPermission,
            deletePermission,
            deleteRole,
            fetchRoles,
            logsData,
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
            isLoading,
            editRole,
            editPermission,
            fetchPermission,
            deletePermission,
            deleteRole,
            fetchRoles,
            clearPermissionsFromNewRole: this.clearPermissionsFromNewRole.bind(this),
            logsData,
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
    logsData: usersSelectors['getLogsData'](state),
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
            fetchLogsData: usersActions.fetchLogsData,
        },
        dispatch,
    )
})(UsersManagerBase)

export { UsersManager }
