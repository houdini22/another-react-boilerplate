import * as React from 'react'
import { Col, Row, Table, Label, Dropdown, Typography } from '../../../../components'
import { DeleteIcon, InfoIcon, UserIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'

interface RowExpandPermissionsProps {
    user: Object
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
            role,
            setIsLoading,
            navigate,
            addToastNotification,
            fetch,
            deleteRolePermission,
            registerModal,
            closeModal,
            openModal,
        } = this.props

        return (
            <Table.Tr key={`permissions${role.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Permissions</h3>
                            </Typography.Container>
                        </Col>
                        {role?.permissions
                            ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            ?.map(({ id: _id, name, guard_name, is_deletable: _is_deletable }) => {
                                registerModal(
                                    `user-remove-role-permission-${_id}-delete`,
                                    <ModalConfirm
                                        onConfirm={() => {
                                            setIsLoading(true)

                                            return deleteRolePermission(role, {
                                                id: _id,
                                            }).then(() => {
                                                fetch().then(() => {
                                                    setIsLoading(false)
                                                    addToastNotification({
                                                        title: 'Delete success.',
                                                        text: 'Permission has been removed from Role.',
                                                        type: 'success',
                                                    })
                                                    closeModal(`user-remove-role-permission-${_id}-delete`)
                                                })
                                            })
                                        }}
                                        onCancel={() => closeModal(`user-remove-role-permission-${_id}-delete`)}
                                    >
                                        <p>
                                            Are you sure to delete Permission: <b>{name}</b> from Role{' '}
                                            <b>{role.name}</b>?
                                        </p>
                                    </ModalConfirm>,
                                )

                                return (
                                    <Col xs={4} key={_id}>
                                        <Dropdown.Container triggerSize={'lg'}>
                                            <Dropdown.Trigger
                                                size="lg"
                                                component={Label}
                                                componentProps={{ block: true }}
                                            >
                                                {name} - {guard_name}
                                            </Dropdown.Trigger>
                                            <Dropdown.Menu>
                                                <Dropdown.Item type={'header'}>
                                                    <InfoIcon /> Permission ID: {_id}
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
                                                    color={'info'}
                                                    onClick={() => {
                                                        navigate(`/roles?permissions=${_id}`)
                                                    }}
                                                >
                                                    <UserIcon /> Show Roles with Permission
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    color="danger"
                                                    onClick={() => {
                                                        openModal(`user-remove-role-permission-${_id}-delete`)
                                                    }}
                                                >
                                                    <DeleteIcon /> Remove Permission from Role
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown.Container>
                                    </Col>
                                )
                            })}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandPermissions
