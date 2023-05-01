import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../../components'
import { DeleteIcon, RoleIcon } from '../../../../components/icons'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    deleteUserRole: Function
    fetchOne: Function
    user: Object
    isLoading: boolean
}

export class Roles extends React.Component<AddRoleProps, null> {
    render() {
        const { setIsLoading, deleteUserRole, fetchOne, user, isLoading, navigate } = this.props

        return (
            <Card header={<h1>Roles</h1>}>
                {user?.roles
                    ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                    .map(({ id: _id, name, guard_name, is_deletable }) => {
                        return (
                            <Dropdown.Container triggerSize={'lg'} key={_id}>
                                <Dropdown.Trigger component={Label} componentProps={{ block: true }}>
                                    {name} - {guard_name}
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            setIsLoading(true)

                                            navigate(`/permissions?roles=${_id}`)
                                        }}
                                    >
                                        <RoleIcon /> Show Role permissions
                                    </Dropdown.Item>
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
                                        <DeleteIcon /> Remove Role from User
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        )
                    })}
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Roles
