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
    deleteUserPermission: Function
    role: any
    permissions: any
}

class UserRolesManagerBase extends React.Component<UserRolesManagerProps> {
    componentDidMount() {
        const { fetch, fetchOne, fetchPermissions, id } = this.props
        if (id) {
            fetchOne(id)
            fetchPermissions()
            fetch()
        } else {
            fetch()
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
            deleteUserPermission,
            permissions,
            fetchOne,
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
            deleteUserPermission,
            permissions,
            fetchOne,
        }

        return children(renderProps)
    }
}

const mapStateToProps = (state) => ({
    roles: commonSelectors['getRoles'](state),
    role: commonSelectors['getRole'](state),
    isLoading: commonSelectors['getIsLoading'](state),
    permissions: commonSelectors['getPermissions'](state),
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
            deleteUserPermission: commonActions.deleteUserPermission,
            deletePermission: commonActions.deletePermission,
        },
        dispatch,
    )
})(UserRolesManagerBase)

export { UserRolesManager }
export default { UserRolesManager }
