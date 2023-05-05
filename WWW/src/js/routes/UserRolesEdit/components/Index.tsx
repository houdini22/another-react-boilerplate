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

interface UsersViewState {}

export class UserRolesEdit extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <TitleManager>
                                    {({ setTitleSegments }) => {
                                        setTitleSegments(['Users', 'Roles', 'Edit'])
                                        return (
                                            <Modal.Manager>
                                                {({ openModal, registerModal, closeModal }) => (
                                                    <UsersManager roleId={query['id']} getUsers getPermissions>
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
                                                                <Header navigate={navigate} role={role} />
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
                                                                        <Permissions
                                                                            role={role}
                                                                            setIsLoading={setIsLoading}
                                                                            fetch={() => fetchRole(role['id'])}
                                                                            isLoading={isLoading}
                                                                            deletePermission={deletePermission}
                                                                            deleteRolePermission={deleteRolePermission}
                                                                            navigate={navigate}
                                                                            addToastNotification={addToastNotification}
                                                                            openModal={openModal}
                                                                            registerModal={registerModal}
                                                                            closeModal={closeModal}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} md={6}>
                                                                        <AddPermissions
                                                                            role={role}
                                                                            permissions={permissions}
                                                                            setIsLoading={setIsLoading}
                                                                            addPermission={addPermission}
                                                                            fetchPermissions={fetchPermissions}
                                                                            fetchOne={() => fetchRole(role.id)}
                                                                            isLoading={isLoading}
                                                                            addToastNotification={addToastNotification}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col xs={12} md={6}>
                                                                        <Users
                                                                            role={role}
                                                                            setIsLoading={setIsLoading}
                                                                            fetch={() => fetchRole(role['id'])}
                                                                            isLoading={isLoading}
                                                                            navigate={navigate}
                                                                            addToastNotification={addToastNotification}
                                                                            openModal={openModal}
                                                                            registerModal={registerModal}
                                                                            closeModal={closeModal}
                                                                            deleteUserRole={deleteUserRole}
                                                                        />
                                                                    </Col>
                                                                    <Col xs={12} md={6}>
                                                                        <AddUsers
                                                                            role={role}
                                                                            users={users}
                                                                            setIsLoading={setIsLoading}
                                                                            fetch={() => fetchRole(role['id'])}
                                                                            isLoading={isLoading}
                                                                            addToastNotification={addToastNotification}
                                                                            addUserRole={addUserRole}
                                                                        />
                                                                    </Col>
                                                                </Row>
                                                            </PageContent>
                                                        )}
                                                    </UsersManager>
                                                )}
                                            </Modal.Manager>
                                        )
                                    }}
                                </TitleManager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UserRolesEdit
