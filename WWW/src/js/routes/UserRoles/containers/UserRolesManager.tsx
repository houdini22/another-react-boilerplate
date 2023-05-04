import * as React from 'react'
import { selectors as commonSelectors, actions as commonActions } from '../../../reducers/roles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface UserRolesManagerProps {
    children: any
    fetch: Function
    fetchOne: Function
    roles: any
    id?: number
    setIsLoading: Function
    editRole: Function
    addRole: Function
    deleteRole: Function
    addPermission: Function
    fetchPermissions: Function
    deletePermission: Function
    deleteRolePermission: Function
    role: any
    permissions: any
}

class UserRolesManagerBase extends React.Component<UserRolesManagerProps, null> {
    state = {
        newRolePermissions: [],
        newRoleUsers: [],
        newPermissionUsers: [],
    }
    componentDidMount() {
        const { fetch, fetchOne, fetchPermissions, id, permissionId, fetchOnePermission } = this.props
        if (id) {
            fetchOne(id)
            fetchPermissions()
            fetch()
        } else {
            fetch()
            fetchPermissions()
        }

        if (permissionId) {
            fetchOnePermission(permissionId)
        }
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
            roles,
            setIsLoading,
            fetch,
            role,
            editRole,
            addRole,
            deleteRole,
            addPermission,
            fetchPermissions,
            deletePermission,
            deleteRolePermission,
            deleteUserRole,
            permissions,
            fetchOne,
            fetchOnePermission,
            permission,
            editPermission,
            addUserPermission,
            deleteUserPermission,
            isLoading,
            addUserRole,
        } = this.props
        const { newRolePermissions, newRoleUsers, newPermissionUsers } = this.state
        const renderProps = {
            roles,
            setIsLoading,
            fetch,
            role,
            editRole,
            addRole,
            deleteRole,
            addPermission,
            fetchPermissions,
            deletePermission,
            deleteRolePermission,
            deleteUserRole,
            permissions,
            fetchOne,
            fetchOnePermission,
            permission,
            editPermission,
            addUserPermission,
            deleteUserPermission,
            isLoading,
            newRolePermissions,
            addPermissionToNewRole: this.addPermissionToNewRole.bind(this),
            removePermissionFromNewRole: this.removePermissionFromNewRole.bind(this),
            addNewRoleToUser: this.addNewRoleToUser.bind(this),
            removeNewRoleFromUser: this.removeNewRoleFromUser.bind(this),
            addNewPermissionToUser: this.addNewPermissionToUser.bind(this),
            removeNewPermissionFromUser: this.removeNewPermissionFromUser.bind(this),
            newRoleUsers,
            addUserRole,
            newPermissionUsers,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    roles: commonSelectors['getRoles'](state),
    role: commonSelectors['getRole'](state),
    isLoading: commonSelectors['getIsLoading'](state),
    permissions: commonSelectors['getPermissions'](state),
    permission: commonSelectors['getPermission'](state),
})

const UserRolesManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            fetch: commonActions.fetch,
            fetchOne: commonActions.fetchOne,
            setIsLoading: commonActions.setIsLoading,
            editRole: commonActions.editRole,
            addRole: commonActions.addRole,
            deleteRole: commonActions.deleteRole,
            addPermission: commonActions.addPermission,
            fetchPermissions: commonActions.fetchPermissions,
            deleteRolePermission: commonActions.deleteRolePermission,
            deletePermission: commonActions.deletePermission,
            deleteUserRole: commonActions.deleteUserRole,
            fetchOnePermission: commonActions.fetchOnePermission,
            editPermission: commonActions.editPermission,
            addUserPermission: commonActions.addUserPermission,
            deleteUserPermission: commonActions.deleteUserPermission,
            addUserRole: commonActions.addUserRole,
        },
        dispatch,
    )
})(UserRolesManagerBase)

export { UserRolesManager }
export default { UserRolesManager }
