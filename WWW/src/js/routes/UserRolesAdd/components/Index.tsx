import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import { AddRole } from './Add/Index'
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
                                <UserRolesManager id={query['id']}>
                                    {({ role, isLoading, addRole, setIsLoading }) => (
                                        <PageContent>
                                            <Header navigate={navigate} role={role} />
                                            <Row>
                                                <Col xs={12} md={6}>
                                                    <AddRole
                                                        addRole={addRole}
                                                        isLoading={isLoading}
                                                        addToastNotification={addToastNotification}
                                                        setIsLoading={setIsLoading}
                                                    />
                                                </Col>
                                                <Col xs={12} md={6}>
                                                    {' '}
                                                </Col>
                                            </Row>
                                        </PageContent>
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

export default UserRolesEdit
