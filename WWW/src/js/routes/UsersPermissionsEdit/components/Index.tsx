import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { EditPermission } from './Edit/Index'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import { UsersManager } from '../../../containers/UsersManager'
import { TitleManager } from '../../../containers/TitleManager'

export class UserRolesEdit extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate, query }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => {
                            return (
                                <TitleManager>
                                    {({ setTitleSegments }) => {
                                        setTitleSegments(['Users', 'Permissions', 'Edit'])

                                        return (
                                            <UsersManager permissionId={query['id']}>
                                                {({ isLoading, setIsLoading, fetchPermission, editPermission, permission }) => {
                                                    return (
                                                        <PageContent>
                                                            <Header navigate={navigate} permission={permission} />
                                                            <Row>
                                                                <Col xs={12} md={6}>
                                                                    <EditPermission
                                                                        editPermission={editPermission}
                                                                        permission={permission}
                                                                        fetchPermission={fetchPermission}
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
                                            </UsersManager>
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
