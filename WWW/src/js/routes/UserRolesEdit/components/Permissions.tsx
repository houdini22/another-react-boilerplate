import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../components'
import { DeleteIcon, RoleIcon, UserIcon } from '../../../components/icons'

interface HeaderProps {
    role: Object
}

export class Permissions extends React.Component<HeaderProps, null> {
    render() {
        const {
            role,
            setIsLoading,
            fetch,
            isLoading,
            deletePermission,
            deleteRolePermission,
            navigate,
            addToastNotification,
        } = this.props
        return (
            <Card header={<h1>Permissions</h1>}>
                {role?.permissions?.map(({ id: _id, name, guard_name, is_deletable }) => {
                    return (
                        <Dropdown.Container triggerSize={'lg'} key={_id}>
                            <Dropdown.Trigger size="lg" component={Label} componentProps={{ block: true }}>
                                {name} - {guard_name}
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    color="info"
                                    onClick={() => {
                                        navigate(`/users?permissions=${_id}`)
                                    }}
                                >
                                    <UserIcon /> Show Users with Permission
                                </Dropdown.Item>
                                <Dropdown.Item
                                    color="info"
                                    onClick={() => {
                                        navigate(`/roles?permissions=${_id}`)
                                    }}
                                >
                                    <RoleIcon /> Show Roles with Permission
                                </Dropdown.Item>
                                <Dropdown.Item
                                    color="danger"
                                    onClick={() => {
                                        setIsLoading(true)

                                        return deleteRolePermission(role, {
                                            id: _id,
                                        }).then(() => {
                                            addToastNotification({
                                                type: 'success',
                                                title: 'Delete success.',
                                                text: 'Permission has been removed from Role.',
                                            })
                                            Promise.all([fetch()]).then(() => {
                                                setIsLoading(false)
                                            })
                                        })
                                    }}
                                >
                                    <DeleteIcon /> Remove Permission from Role
                                </Dropdown.Item>
                                {is_deletable == 1 && (
                                    <Dropdown.Item
                                        color="danger"
                                        onClick={() => {
                                            setIsLoading(true)

                                            return deletePermission(_id).then(() => {
                                                addToastNotification({
                                                    type: 'success',
                                                    title: 'Delete success.',
                                                    text: 'Permission has been removed.',
                                                })
                                                Promise.all([fetch()]).then(() => {
                                                    setIsLoading(false)
                                                })
                                            })
                                        }}
                                    >
                                        <DeleteIcon /> Delete Permission
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
