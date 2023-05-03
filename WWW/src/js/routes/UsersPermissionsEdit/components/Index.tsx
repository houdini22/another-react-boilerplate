import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { EditPermission } from './Edit/Index'
import { NotificationsManager } from '../../../containers/NotificationsManager'

export class UserRolesEdit extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <UserRolesManager permissionId={query['id']}>
                                    {({ isLoading, setIsLoading, fetchOnePermission, editPermission, permission }) => {
                                        return (
                                            <PageContent>
                                                <Header navigate={navigate} permission={permission} />
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <EditPermission
                                                            editPermission={editPermission}
                                                            permission={permission}
                                                            fetchOnePermission={fetchOnePermission}
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
                                        )
                                    }}
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
