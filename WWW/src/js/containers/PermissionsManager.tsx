import * as React from 'react'
import { selectors as permissionsSelectors, actions as permissionsActions } from '../reducers/permissions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AuthManager } from './AuthManager'
import { Permission } from '../../types.d'

interface PermissionsManagerProps {
    children: any
    addPermission: Function
    fetchPermissions: Function
    deleteRolePermission: Function
    deletePermission: Function
    fetchPermission: Function
    editPermission: Function
    addUserPermission: Function
    deleteUserPermission: Function
    isLoading: boolean
    permissions: Array<Permissions>
    permission: Permission
    id?: string | number
}

class PermissionsManagerBase extends React.Component<PermissionsManagerProps, null> {
    state = {
        newUsers: [],
    }

    componentDidMount() {
        const { id, fetchPermissions, getPermissions, fetchPermission, setIsLoading, getUsers, fetchUsers, fetchRoles, getRoles } = this.props
        const promises = []

        setIsLoading(true).then(() => {
            if (getPermissions) {
                promises.push(fetchPermissions())
            }

            if (id) {
                promises.push(fetchPermission(id))
            }

            if (getUsers) {
                promises.push(fetchUsers())
            }

            if (getRoles) {
                promises.push(fetchRoles())
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

    addUserToNewPermission(id) {
        const { newUsers } = this.state

        this.setState({
            newUsers: [...newUsers, id],
        })
    }

    removeUserFromNewPermission(id) {
        const { newUsers } = this.state

        this.setState({
            newUsers: newUsers.filter(({ id: _id }) => {
                return Number(id) !== Number(_id)
            }),
        })
    }

    render() {
        const {
            children,
            setIsLoading,
            permissions,
            permission,
            deleteUserPermission,
            fetchPermissions,
            addUserPermission,
            deleteRolePermission,
            addPermission,
            isLoading,
            editPermission,
            fetchPermission,
            deletePermission,
            users,
            roles,
        } = this.props
        const { newUsers } = this.state
        const renderProps = {
            setIsLoading,
            permissions,
            permission,
            deleteUserPermission,
            fetchPermissions,
            addUserPermission,
            deleteRolePermission,
            addPermission,
            isLoading,
            editPermission,
            fetchPermission,
            deletePermission,
            addUserToNewPermission: this.addUserToNewPermission.bind(this),
            removeUserFromNewPermission: this.removeUserFromNewPermission.bind(this),
            users,
            newUsers,
            roles,
        }

        return (
            <>
                <AuthManager>{() => <>{children(renderProps)}</>}</AuthManager>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: permissionsSelectors['getIsLoading'](state),
    permissions: permissionsSelectors['getPermissions'](state),
    permission: permissionsSelectors['getPermission'](state),
    logsData: permissionsSelectors['getLogsData'](state),
    users: permissionsSelectors['getUsers'](state),
    roles: permissionsSelectors['getRoles'](state),
})

const PermissionsManager = connect(mapStateToProps, (dispatch) => {
    return bindActionCreators(
        {
            setIsLoading: permissionsActions.setIsLoading,
            addPermission: permissionsActions.addPermission,
            fetchPermissions: permissionsActions.fetchPermissions,
            deleteRolePermission: permissionsActions.deleteRolePermission,
            deletePermission: permissionsActions.deletePermission,
            fetchPermission: permissionsActions.fetchPermission,
            editPermission: permissionsActions.editPermission,
            addUserPermission: permissionsActions.addUserPermission,
            deleteUserPermission: permissionsActions.deleteUserPermission,
            fetchUsers: permissionsActions.fetchUsers,
            fetchRoles: permissionsActions.fetchRoles,
        },
        dispatch,
    )
})(PermissionsManagerBase)

export { PermissionsManager }
