import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { Col, Row } from '../../../components'
import { UsersManager } from '../containers/UsersManager'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import Add from './Add/Add'
import Roles from './Roles/Roles'

interface UsersViewState {}

export class UsersAddView extends React.Component<null, UsersViewState> {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <UserRolesManager>
                        {({ roles, deletePermission }) => (
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
                                }) => {
                                    return (
                                        <PageContent>
                                            <Header />
                                            <Row>
                                                <Col xs={6}>
                                                    <Add
                                                        addUser={addUser}
                                                        user={user}
                                                        fetchOne={fetchOne}
                                                        isLoading={isLoading}
                                                        setIsLoading={setIsLoading}
                                                        navigate={navigate}
                                                        addUserRole={addUserRole}
                                                    />
                                                </Col>
                                                <Col xs={6}>
                                                    <Roles
                                                        roles={roles}
                                                        addRoleToNewUser={addRoleToNewUser}
                                                        removeRoleFromNewUser={removeRoleFromNewUser}
                                                    />
                                                </Col>
                                            </Row>
                                        </PageContent>
                                    )
                                }}
                            </UsersManager>
                        )}
                    </UserRolesManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersAddView
