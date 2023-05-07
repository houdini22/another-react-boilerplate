import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Col, Modal, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Edit from './Edit/Edit'
import Permissions from './Permissions'
import AddPermissions from './AddPermissions'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import Users from './Users'
import AddUsers from './AddUsers'
import { UsersManager } from '../../../containers/UsersManager'
import { TitleManager } from '../../../containers/TitleManager'
import { AuthorizationManager } from '../../../containers/AuthorizationManager'

export class UserRolesEdit extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query: { id: roleId } }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <AuthorizationManager>
                                    {({ canByPermission }) => (
                                        <TitleManager>
                                            {({ setTitleSegments }) => {
                                                setTitleSegments(['Users', 'Roles', 'Edit'])
                                                return (
                                                    <UsersManager roleId={roleId} getUsers getPermissions>
                                                        {({
                                                            users,
                                                            deletePermission,
                                                            role,
                                                            isLoading,
                                                            editRole,
                                                            fetchRole,
                                                            permissions,
                                                            setIsLoading,
                                                            addPermission,
                                                            fetchPermissions,
                                                            deleteRolePermission,
                                                            fetch,
                                                            deleteUserRole,
                                                            addUserRole,
                                                        }) => (
                                                            <PageContent>
                                                                <Header role={role} />
                                                                <Row>
                                                                    <Col xs={12} md={6}>
                                                                        <Edit
                                                                            editRole={editRole}
                                                                            role={role}
                                                                            fetchOne={() => fetchRole(role['id'])}
                                                                            fetch={fetch}
                                                                            isLoading={isLoading}
                                                                            addToastNotification={addToastNotification}
                                                                            setIsLoading={setIsLoading}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={12} md={6}>
                                                                        {canByPermission('roles.list_permissions') && (
                                                                            <Permissions
                                                                                role={role}
                                                                                setIsLoading={setIsLoading}
                                                                                fetch={() => fetchRole(role['id'])}
                                                                                isLoading={isLoading}
                                                                                deletePermission={deletePermission}
                                                                                deleteRolePermission={deleteRolePermission}
                                                                            />
                                                                        )}
                                                                    </Col>
                                                                    <Col xs={12} md={6}>
                                                                        {canByPermission('roles.add_permission') && (
                                                                            <AddPermissions
                                                                                role={role}
                                                                                permissions={permissions}
                                                                                setIsLoading={setIsLoading}
                                                                                addPermission={addPermission}
                                                                                fetchPermissions={fetchPermissions}
                                                                                fetchOne={() => fetchRole(role.id)}
                                                                                isLoading={isLoading}
                                                                            />
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={12} md={6}>
                                                                        {canByPermission('roles.list_users') && (
                                                                            <Users
                                                                                role={role}
                                                                                setIsLoading={setIsLoading}
                                                                                fetch={() => fetchRole(role['id'])}
                                                                                isLoading={isLoading}
                                                                                deleteUserRole={deleteUserRole}
                                                                            />
                                                                        )}
                                                                    </Col>
                                                                    <Col xs={12} md={6}>
                                                                        {canByPermission('users.add_permission') && (
                                                                            <AddUsers
                                                                                role={role}
                                                                                users={users}
                                                                                setIsLoading={setIsLoading}
                                                                                fetch={() => fetchRole(role['id'])}
                                                                                isLoading={isLoading}
                                                                                addUserRole={addUserRole}
                                                                            />
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                            </PageContent>
                                                        )}
                                                    </UsersManager>
                                                )
                                            }}
                                        </TitleManager>
                                    )}
                                </AuthorizationManager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UserRolesEdit
