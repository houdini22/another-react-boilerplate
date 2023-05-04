import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../components'
import { DeleteIcon, RoleIcon, UserIcon } from '../../../components/icons'
import { Role } from '../../../../types.d'
import { ModalConfirm } from '../../../components/common/ModalConfirm'

interface HeaderProps {
    role: Role
}

export class Users extends React.Component<HeaderProps, null> {
    render() {
        const {
            role,
            setIsLoading,
            fetch,
            isLoading,
            navigate,
            addToastNotification,
            openModal,
            registerModal,
            closeModal,
            deleteUserRole,
        } = this.props
        return (
            <Card header={<h1>Users</h1>}>
                {role?.users?.map(({ id: _id, name }) => {
                    registerModal(
                        `delete-role-from-user-${_id}`,
                        <ModalConfirm
                            onConfirm={() => {
                                setIsLoading(true)

                                return deleteUserRole(
                                    {
                                        id: _id,
                                    },
                                    role,
                                ).then(() => {
                                    addToastNotification({
                                        type: 'success',
                                        title: 'Delete success.',
                                        text: 'Permission has been removed from Role.',
                                    })
                                    Promise.all([fetch()]).then(() => {
                                        setIsLoading(false)
                                        closeModal(`delete-role-from-user-${_id}`)
                                    })
                                })
                            }}
                            onCancel={() => {
                                closeModal(`delete-role-from-user-${_id}`)
                            }}
                        >
                            Are you sure to delete Role: <b>{role.name}</b> from User: <b>{name}</b>?
                        </ModalConfirm>,
                    )

                    return (
                        <Dropdown.Container triggerSize={'lg'} key={_id}>
                            <Dropdown.Trigger size="lg" component={Label} componentProps={{ block: true }}>
                                {name}
                            </Dropdown.Trigger>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    color="info"
                                    onClick={() => {
                                        navigate(`/roles?user=${name}`)
                                    }}
                                >
                                    <RoleIcon /> Show User Roles
                                </Dropdown.Item>
                                <Dropdown.Item
                                    color="warning"
                                    onClick={() => {
                                        navigate(`/users/edit?id=${_id}`)
                                    }}
                                >
                                    <RoleIcon /> Edit User
                                </Dropdown.Item>
                                <Dropdown.Item
                                    color="danger"
                                    onClick={() => {
                                        openModal(`delete-role-from-user-${_id}`)
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

export default Users
