import * as React from 'react'
import { Col, Row } from '../../../components'
import { PageContent } from '../../../layouts/PageLayout/components'
import Header from './Header'
import { AddPermission } from './Add/Index'
import { PermissionsManager, TitleManager } from '../../../containers'

export class UserPermissionsAddView extends React.Component<null, null> {
    render() {
        return (
            <TitleManager>
                {({ setTitleSegments }) => {
                    setTitleSegments(['Users', 'Permissions', 'Add'])

                    return (
                        <PermissionsManager getUsers getRoles>
                            {({
                                isLoading,
                                setIsLoading,
                                addPermission,
                                newPermissionUsers,
                                addUserToNewPermission,
                                removeUserFromNewPermission,
                                users,
                                newUsers,
                                roles,
                            }) => (
                                <PageContent>
                                    <Header />
                                    <Row>
                                        <Col xs={12}>
                                            <AddPermission
                                                addPermission={addPermission}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                newPermissionUsers={newPermissionUsers}
                                                addUserToNewPermission={addUserToNewPermission}
                                                removeUserFromNewPermission={removeUserFromNewPermission}
                                                users={users}
                                                newUsers={newUsers}
                                                roles={roles}
                                            />
                                        </Col>
                                    </Row>
                                </PageContent>
                            )}
                        </PermissionsManager>
                    )
                }}
            </TitleManager>
        )
    }
}

export default UserPermissionsAddView
