import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../../components'
import { DeleteIcon } from '../../../../components/icons'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    deleteUserRole: Function
    fetchOne: Function
    user: Object
    isLoading: boolean
}

export class AddRole extends React.Component<AddRoleProps, null> {
    render() {
        const { setIsLoading, deleteUserRole, fetchOne, user, isLoading } = this.props
        return (
            <Card header={<h1>Roles</h1>}>
                {user?.roles?.map(({ id: _id, name, guard_name, is_deletable }) => {
                    return (
                        <Dropdown.Container size={'sm'} triggerSize={'lg'} key={_id}>
                            <Dropdown.Trigger component={Label}>
                                {name} - {guard_name}
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                {
                                    <Dropdown.Item
                                        color="danger"
                                        onClick={() => {
                                            setIsLoading(true)

                                            return deleteUserRole(user, {
                                                id: _id,
                                            }).then(() => {
                                                Promise.all([fetchOne(user['id'])]).then(() => {
                                                    setIsLoading(false)
                                                })
                                            })
                                        }}
                                    >
                                        <DeleteIcon /> Delete from User
                                    </Dropdown.Item>
                                }
                            </Dropdown.Menu>
                        </Dropdown.Container>
                    )
                })}
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default AddRole
