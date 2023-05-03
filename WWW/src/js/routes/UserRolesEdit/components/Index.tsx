import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import {Col, Modal, Row} from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Edit from './Edit/Edit'
import Permissions from './Permissions'
import AddPermissions from './AddPermissions'
import { NotificationsManager } from '../../../containers/NotificationsManager'

interface UsersViewState {}

export class UserRolesEdit extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <Modal.Manager>
                                    {({openModal, registerModal, closeModal}) => (
                                        <UserRolesManager id={query['id']}>
                                            {({
                                                  roles,
                                                  deletePermission,
                                                  role,
                                                  isLoading,
                                                  editRole,
                                                  fetchOne,
                                                  permissions,
                                                  setIsLoading,
                                                  addPermission,
                                                  fetchPermissions,
                                                  deleteRolePermission,
                                                  fetch,
                                              }) => (
                                                <PageContent>
                                                    <Header navigate={navigate} role={role} />
                                                    <Row>
                                                        <Col xs={12} md={6}>
                                                            <Edit
                                                                editRole={editRole}
                                                                role={role}
                                                                fetchOne={() => fetchOne(role['id'])}
                                                                fetch={fetch}
                                                                isLoading={isLoading}
                                                                addToastNotification={addToastNotification}
                                                            />
                                                        </Col>
                                                        <Col xs={12} md={6}>
                                                            <AddPermissions
                                                                role={role}
                                                                roles={roles}
                                                                permissions={permissions}
                                                                setIsLoading={setIsLoading}
                                                                addPermission={addPermission}
                                                                fetchPermissions={fetchPermissions}
                                                                fetchOne={fetchOne}
                                                                isLoading={isLoading}
                                                                addToastNotification={addToastNotification}
                                                            />
                                                            <Permissions
                                                                role={role}
                                                                setIsLoading={setIsLoading}
                                                                fetch={() => fetchOne(role['id'])}
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
                                                    </Row>
                                                </PageContent>
                                            )}
                                        </UserRolesManager>
                                    )}
                                </Modal.Manager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UserRolesEdit
