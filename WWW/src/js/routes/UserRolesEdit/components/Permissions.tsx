import * as React from 'react'
import { Card, Dropdown, Label, LoadingOverlay } from '../../../components'
import { DeleteIcon, RoleIcon, UserIcon } from '../../../components/icons'
import { Role } from '../../../../types.d'
import { ModalConfirm } from '../../../components/common/ModalConfirm'

interface HeaderProps {
    role: Role
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
            openModal,
            registerModal,
            closeModal,
        } = this.props
        return (
            <Card header={<h1>Permissions</h1>}>
                {role?.permissions?.map(({ id: _id, name }) => {
                    registerModal(
                        `delete-permission-from-role-${_id}`,
                        <ModalConfirm
                            onConfirm={() => {
                                setIsLoading(true)

                                return deleteRolePermission(role, {
                                    id: _id,
                                }).then(() => {
                                    Promise.all([fetch()]).then(() => {
                                        setIsLoading(false)
                                        addToastNotification({
                                            type: 'success',
                                            title: 'Remove success.',
                                            text: `Permission ID: ${_id} has been removed from Role ID: ${role.id}.`,
                                            href: `/roles/edit?id=${role.id}}`,
                                        })
                                        closeModal(`delete-permission-from-role-${_id}`)
                                    })
                                })
                            }}
                            onCancel={() => {
                                closeModal(`delete-permission-from-role-${_id}`)
                            }}
                        >
                            Are you sure to delete Permission: <b>{name}</b> from Role: <b>{role.name}</b>?
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
                                    color="warning"
                                    onClick={() => {
                                        navigate(`/permissions/edit?id=${_id}`)
                                    }}
                                >
                                    <RoleIcon /> Edit Permission
                                </Dropdown.Item>
                                <Dropdown.Item
                                    color="danger"
                                    onClick={() => {
                                        openModal(`delete-permission-from-role-${_id}`)
                                    }}
                                >
                                    <DeleteIcon /> Remove Permission from Role
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

export default Permissions
