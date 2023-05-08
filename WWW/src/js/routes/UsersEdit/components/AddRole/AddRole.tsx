import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { AddRoleFormContainer } from './AddRoleFormContainer'
import { User } from '../../../../../types.d'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    addUserRole: Function
    fetchOne: Function
    user: User
    isLoading: boolean
}

export class AddRole extends React.Component<AddRoleProps, null> {
    render() {
        const { roles, setIsLoading, addUserRole, fetchOne, user, isLoading, addToastNotification } = this.props
        return (
            <Card header={<h1>Add Role</h1>} color={'primary'}>
                <AddRoleFormContainer
                    user={user}
                    roles={roles}
                    onSubmit={({ role }) => {
                        return setIsLoading(true).then(() => {
                            return addUserRole(user, { id: role }).then(() => {
                                return fetchOne(user['id']).then(() => {
                                    setIsLoading(false)
                                    addToastNotification({
                                        type: 'success',
                                        title: 'Save success.',
                                        text: `Role ID: ${role} has been added to User ID: ${user?.id}.`,
                                        href: `/users/edit?id=${user?.id}`,
                                    })
                                })
                            })
                        })
                    }}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default AddRole
