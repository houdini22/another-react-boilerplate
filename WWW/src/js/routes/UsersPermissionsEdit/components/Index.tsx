import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { EditPermission } from './Edit/Index'
import { UsersManager } from '../../../containers/UsersManager'
import { TitleManager } from '../../../containers/TitleManager'

export class UserRolesEdit extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ query: { id: permissionId } }) => (
                    <TitleManager>
                        {({ setTitleSegments }) => {
                            setTitleSegments(['Users', 'Permissions', 'Edit'])

                            return (
                                <UsersManager permissionId={permissionId}>
                                    {({ isLoading, setIsLoading, fetchPermission, editPermission, permission }) => {
                                        return (
                                            <PageContent>
                                                <Header permission={permission} />
                                                <Row>
                                                    <Col xs={12} md={6}>
                                                        <EditPermission
                                                            editPermission={editPermission}
                                                            permission={permission}
                                                            fetchPermission={fetchPermission}
                                                            isLoading={isLoading}
                                                            setIsLoading={setIsLoading}
                                                        />
                                                    </Col>
                                                </Row>
                                            </PageContent>
                                        )
                                    }}
                                </UsersManager>
                            )
                        }}
                    </TitleManager>
                )}
            </RouteManager>
        )
    }
}

export default UserRolesEdit
