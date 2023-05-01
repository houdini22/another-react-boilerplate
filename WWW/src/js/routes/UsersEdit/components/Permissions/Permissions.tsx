import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../../components'
import { DeleteIcon, RoleIcon } from '../../../../components/icons'

interface AddRoleProps {
    roles: any
    setIsLoading: Function
    deletePermission: Function
    fetchOne: Function
    user: Object
    isLoading: boolean
}

export class Permissions extends React.Component<AddRoleProps, null> {
    getPermissionFromRoles() {
        const { user } = this.props

        const permissionsFromRoles = {}

        user?.roles?.forEach(({ permissions }) => {
            permissions?.forEach(({ name, ...rest }) => {
                if (permissionsFromRoles[name]) {
                    if (!permissionsFromRoles[name].occurence) {
                        permissionsFromRoles[name].occurence = 1
                    }
                    permissionsFromRoles[name].occurence++
                } else {
                    permissionsFromRoles[name] = { name, ...rest }
                }
            })
        })

        user?.permissions?.forEach(({ id, guard_name, is_deletable, name, ...rest }) => {
            if (permissionsFromRoles[name]) {
                if (!permissionsFromRoles[name].occurence) {
                    permissionsFromRoles[name].occurence = 1
                }
                permissionsFromRoles[name].occurence++
            } else {
                permissionsFromRoles[name] = { name, id, guard_name, is_deletable, ...rest }
            }
        })

        return permissionsFromRoles
    }
    render() {
        const { setIsLoading, deletePermission, fetchOne, user, isLoading, navigate, deleteUserPermission } = this.props

        const permissionsFromRoles = this.getPermissionFromRoles()

        return (
            <Card header={<h1>Permissions</h1>}>
                {Object.keys(permissionsFromRoles)
                    .map((key) => permissionsFromRoles[key])
                    .sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                    .map(({ id, name, guard_name, is_deletable, occurence, pivot: { model_type = '' } = {} }) => {
                        return (
                            <Dropdown.Container triggerSize={'lg'} key={id}>
                                <Dropdown.Trigger component={Label} componentProps={{ block: true }}>
                                    {name} - {guard_name} {occurence > 0 && `(${occurence})`}
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            navigate(`/roles?permissions=${id}`)
                                        }}
                                    >
                                        <DeleteIcon /> Show Roles
                                    </Dropdown.Item>
                                    {model_type.match(/User/) && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                setIsLoading(true)

                                                return deleteUserPermission({ id }, user).then(() => {
                                                    Promise.all([fetchOne(user['id'])]).then(() => {
                                                        setIsLoading(false)
                                                    })
                                                })
                                            }}
                                        >
                                            <DeleteIcon /> Delete from User
                                        </Dropdown.Item>
                                    )}
                                    {is_deletable == 1 && (
                                        <Dropdown.Item
                                            color="danger"
                                            onClick={() => {
                                                setIsLoading(true)

                                                return deletePermission(id).then(() => {
                                                    Promise.all([fetchOne(user['id'])]).then(() => {
                                                        setIsLoading(false)
                                                    })
                                                })
                                            }}
                                        >
                                            <DeleteIcon /> Delete Permission Permanently
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown.Container>
                        )
                    })}
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default Permissions
