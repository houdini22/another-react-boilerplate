import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { Card, Col, LoadingOverlay, Row } from '../../../components'
import { UsersManager } from '../../../containers/UsersManager'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Add from './Add/Add'
import { ListManager } from '../../../components/common/List/ListManager'
import ConfirmDeleteModal from '../../Users/components/ConfirmDeleteModal'
import UsersFilters from '../../Users/components/UsersFilters'
import { Pagination } from '../../../components/common/List/Pagination'
import UsersTable from '../../Users/components/UsersTable'
import { NotificationsManager } from '../../../containers/NotificationsManager'

interface UsersViewState {}

export class UsersAddView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <UserRolesManager>
                                    {({ roles, permissions }) => (
                                        <UsersManager>
                                            {({
                                                user,
                                                isLoading,
                                                setIsLoading,
                                                addUser,
                                                fetchOne,
                                                addUserRole,
                                                addRoleToNewUser,
                                                removeRoleFromNewUser,
                                                addPermissionToNewUser,
                                                removePermissionFromNewUser,
                                            }) => {
                                                return (
                                                    <PageContent>
                                                        <Header />
                                                        <Row>
                                                            <Col xs={12}>
                                                                <Add
                                                                    addUser={addUser}
                                                                    user={user}
                                                                    fetchOne={fetchOne}
                                                                    isLoading={isLoading}
                                                                    setIsLoading={setIsLoading}
                                                                    navigate={navigate}
                                                                    addUserRole={addUserRole}
                                                                    addRoleToNewUser={addRoleToNewUser}
                                                                    removeRoleFromNewUser={removeRoleFromNewUser}
                                                                    roles={roles}
                                                                    permissions={permissions}
                                                                    addPermissionToNewUser={addPermissionToNewUser}
                                                                    removePermissionFromNewUser={
                                                                        removePermissionFromNewUser
                                                                    }
                                                                    addToastNotification={addToastNotification}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </PageContent>
                                                )
                                            }}
                                        </UsersManager>
                                    )}
                                </UserRolesManager>
                            )
                        }}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersAddView
