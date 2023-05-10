import * as React from 'react'
import { Card, Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import { Header } from './Header'
import { TitleManager, RouteManager, PermissionsManager } from '../../../containers'
import { EditPermission } from '../../CmsSettings/components/Edit/Index'
import { PermissionIcon } from '../../../components/icons'

export class UsersPermissionsEditView extends React.Component<null, null> {
    render() {
        return (
            <TitleManager>
                {({ setTitleSegments }) => {
                    setTitleSegments(['Users', 'Permissions', 'Edit'])

                    return (
                        <RouteManager>
                            {({ query: { id } }) => (
                                <PermissionsManager id={id}>
                                    {({ isLoading, setIsLoading, fetchPermission, editPermission, permission }) => {
                                        return (
                                            <PageContent>
                                                <Header permission={permission} />
                                                <Row>
                                                    <Col xs={12}>
                                                        <Card
                                                            header={
                                                                <h1>
                                                                    <PermissionIcon /> Edit Permission
                                                                </h1>
                                                            }
                                                            color={'success'}
                                                        >
                                                            <EditPermission
                                                                editPermission={editPermission}
                                                                permission={permission}
                                                                fetchPermission={fetchPermission}
                                                                isLoading={isLoading}
                                                                setIsLoading={setIsLoading}
                                                            />
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </PageContent>
                                        )
                                    }}
                                </PermissionsManager>
                            )}
                        </RouteManager>
                    )
                }}
            </TitleManager>
        )
    }
}

export default UsersPermissionsEditView
