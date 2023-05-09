import * as React from 'react'
import { AddFormContainer } from './AddFormContainer'
import { FormContainer } from '../../../../containers'
import { Card, LoadingOverlay } from '../../../../components'

interface AddPermissionProps {}

export class AddPermission extends React.Component<AddPermissionProps, null> {
    render() {
        const {
            roles,
            setIsLoading,
            addPermission,
            isLoading,
            users,
            removeUserFromNewPermission,
            addUserToNewPermission,
            noAddToUsers,
            noRoleId,
            newUsers,
            clearUsersFromNewPermission,
            fullWith,
        } = this.props
        return (
            <FormContainer>
                {({ addToastNotification, canByPermission }) => (
                    <Card header={<h1>Add Permission</h1>} color="success">
                        <AddFormContainer
                            roles={roles}
                            setIsLoading={setIsLoading}
                            addPermission={addPermission}
                            addToastNotification={addToastNotification}
                            users={users}
                            newUsers={newUsers}
                            removeUserFromNewPermission={removeUserFromNewPermission}
                            addUserToNewPermission={addUserToNewPermission}
                            noAddToUsers={noAddToUsers}
                            noRoleId={noRoleId}
                            canByPermission={canByPermission}
                            clearUsersFromNewPermission={clearUsersFromNewPermission}
                            fullWidth={fullWith}
                        />
                        {isLoading && <LoadingOverlay />}
                    </Card>
                )}
            </FormContainer>
        )
    }
}

export default { AddPermission }
