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

class UserRolesManagerBase extends React.Component<UserRolesManagerProps> {
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
        } = this.props
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
        },
        dispatch,
    )
})(UserRolesManagerBase)

export { UserRolesManager }
export default { UserRolesManager }
