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
                                addUserToNewPermission,
                                removeUserFromNewPermission,
                                users,
                                newUsers,
                                roles,
                                clearUsersFromNewPermission,
                            }) => (
                                <PageContent>
                                    <Header />
                                    <Row>
                                        <Col xs={12}>
                                            <AddPermission
                                                addPermission={addPermission}
                                                isLoading={isLoading}
                                                setIsLoading={setIsLoading}
                                                addUserToNewPermission={addUserToNewPermission}
                                                removeUserFromNewPermission={removeUserFromNewPermission}
                                                users={users}
                                                newUsers={newUsers}
                                                roles={roles}
                                                clearUsersFromNewPermission={clearUsersFromNewPermission}
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
