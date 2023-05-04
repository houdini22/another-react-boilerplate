import * as React from 'react'
import { Col, Row, Table, Label, Dropdown, Typography } from '../../../../components'
import { DeleteIcon, RoleIcon, UserIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { User } from '../../../../../types.d'
import { sortPermissionsByNameAscending } from '../../../../helpers/permissions'

interface RowExpandPermissionsProps {
    user: User
    permissionsFromRoles: Object
    setIsLoading: Function
    navigate: Function
    deleteUserPermission: Function
    addToastNotification: Function
    fetch: Function
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const {
            user,
            permissionsFromRoles,
            setIsLoading,
            navigate,
            deleteUserPermission,
            addToastNotification,
            fetch,
            registerModal,
            openModal,
            closeModal,
        } = this.props

        const permissions = Object.keys(permissionsFromRoles)?.map((key) => permissionsFromRoles[key])

        return (
            <Table.Tr key={`permissions${user.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Permissions From Roles</h3>
                            </Typography.Container>
                        </Col>
                        {sortPermissionsByNameAscending(permissions).map(
                            (
                                { id: _id, name, is_deletable: _is_deletable, pivot: { model_type = '' } = {} },
                                occurrence,
                            ) => {
                                return (
                                    <Col xs={4} key={`${_id}`}>
                                        <Dropdown.Container triggerSize={'lg'} key={_id}>
                                            <Dropdown.Trigger
                                                size="lg"
                                                componentProps={{ block: true }}
                                                component={Label}
                                            >
                                                {name} {occurrence > 1 && `(${occurrence})`}
                                            </Dropdown.Trigger>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/roles?permissions=${_id}`)
                                                    }}
                                                >
                                                    <RoleIcon /> Show Roles with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/users?permissions=${_id}`)
                                                    }}
                                                >
                                                    <UserIcon /> Show Users with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'warning'}
                                                    onClick={() => {
                                                        navigate(`/permissions/edit?id=${_id}`)
                                                    }}
                                                >
                                                    <UserIcon /> Edit Permission
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Container>
                                    </Col>
                                )
                            },
                        )}
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Direct Permissions</h3>
                            </Typography.Container>
                        </Col>
                        {sortPermissionsByNameAscending(user?.permissions).map(
                            (
                                { id: _id, name, is_deletable: _is_deletable, pivot: { model_type = '' } = {} },
                                occurrence,
                            ) => {
                                registerModal(
                                    `user-remove-permission-${_id}-delete`,
                                    <ModalConfirm
                                        onConfirm={() => {
                                            setIsLoading(true)

                                            deleteUserPermission(
                                                {
                                                    id: _id,
                                                },
                                                {
                                                    id: user.id,
                                                },
                                            ).then(() => {
                                                fetch().then(() => {
                                                    setIsLoading(false)
                                                    addToastNotification({
                                                        title: 'Remove success.',
                                                        text: 'Permission has been removed from user.',
                                                        type: 'success',
                                                    })
                                                    closeModal(`user-remove-permission-${_id}-delete`)
                                                })
                                            })
                                        }}
                                        onCancel={() => closeModal(`user-remove-permission-${_id}-delete`)}
                                    >
                                        <p>
                                            Are you sure to delete Permission: <b>{name}</b> from User{' '}
                                            <b>{user.name}</b>?
                                        </p>
                                    </ModalConfirm>,
                                )

                                return (
                                    <Col xs={4} key={`${_id}`}>
                                        <Dropdown.Container triggerSize={'lg'} key={_id}>
                                            <Dropdown.Trigger
                                                size="lg"
                                                componentProps={{ block: true }}
                                                component={Label}
                                            >
                                                {name} {occurrence > 1 && `(${occurrence})`}
                                            </Dropdown.Trigger>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/roles?permissions=${_id}`)
                                                    }}
                                                >
                                                    <RoleIcon /> Show Roles with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/users?permissions=${_id}`)
                                                    }}
                                                >
                                                    <UserIcon /> Show Users with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color={'warning'}
                                                    onClick={() => {
                                                        navigate(`/permissions/edit?id=${_id}`)
                                                    }}
                                                >
                                                    <UserIcon /> Edit Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color="danger"
                                                    onClick={() => {
                                                        openModal(`user-remove-permission-${_id}-delete`)
                                                    }}
                                                >
                                                    <DeleteIcon /> Remove Permission from User
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Container>
                                    </Col>
                                )
                            },
                        )}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandPermissions
