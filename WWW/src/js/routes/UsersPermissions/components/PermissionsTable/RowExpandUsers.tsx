import * as React from 'react'
import { Col, Row, Table, Label, Dropdown, Typography, Modal } from '../../../../components'
import { DeleteIcon, DetailsIcon, EditIcon, InfoIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'

interface RowExpandPermissionsProps {
    setIsLoading: Function
    navigate: Function
    deleteUserPermission: Function
    addToastNotification: Function
    fetch: Function
}

export class RowExpandPermissions extends React.Component<RowExpandPermissionsProps, null> {
    render() {
        const { permission, setIsLoading, navigate, addToastNotification, fetch, deleteUserPermission } = this.props

        return (
            <Table.Tr key={`permissions${permission.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Users with Permission</h3>
                            </Typography.Container>
                        </Col>
                        {permission?.users
                            ?.sort(({ name: nameA }, { name: nameB }) => nameA.localeCompare(nameB))
                            .map(({ id: _id, name }) => {
                                return (
                                    <Modal.Manager>
                                        {({ openModal, registerModal, closeModal }) => {
                                            registerModal(
                                                `role-delete-from-user-${permission.id}-delete`,
                                                <ModalConfirm
                                                    onConfirm={() => {
                                                        setIsLoading(true)

                                                        return deleteUserPermission(permission, {
                                                            id: _id,
                                                        }).then(() => {
                                                            fetch().then(() => {
                                                                setIsLoading(false)
                                                                addToastNotification({
                                                                    title: 'Delete success.',
                                                                    text: 'Permission has been removed from User.',
                                                                    type: 'success',
                                                                })
                                                                closeModal(
                                                                    `role-delete-from-user-${permission.id}-delete`,
                                                                )
                                                            })
                                                        })
                                                    }}
                                                    onCancel={() =>
                                                        closeModal(`role-delete-from-user-${permission.id}-delete`)
                                                    }
                                                >
                                                    <p>
                                                        Are you sure to delete Permission: <b>{permission.name}</b> from
                                                        User: <b>{name}</b>?
                                                    </p>
                                                </ModalConfirm>,
                                            )

                                            return (
                                                <Col key={name} xs={4}>
                                                    <Dropdown.Container triggerSize={'lg'}>
                                                        <Dropdown.Trigger
                                                            size="lg"
                                                            component={Label}
                                                            componentProps={{ block: true }}
                                                        >
                                                            {name}
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item type={'header'}>
                                                                <InfoIcon /> User ID: {_id}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'info'}
                                                                onClick={() => {
                                                                    navigate(`/permissions?user=${name}`)
                                                                }}
                                                            >
                                                                <DetailsIcon /> Show User Permissions
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'info'}
                                                                onClick={() => {
                                                                    navigate(`/roles?user=${name}`)
                                                                }}
                                                            >
                                                                <DetailsIcon /> Show User Roles
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'info'}
                                                                onClick={() => {
                                                                    navigate(`/media?user=${name}`)
                                                                }}
                                                            >
                                                                <DetailsIcon /> Show User Media
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'warning'}
                                                                onClick={() => {
                                                                    navigate(`/users/edit?id=${_id}`)
                                                                }}
                                                            >
                                                                <EditIcon /> Edit User
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color="danger"
                                                                onClick={() => {
                                                                    openModal(
                                                                        `role-delete-from-user-${permission.id}-delete`,
                                                                    )
                                                                }}
                                                            >
                                                                <DeleteIcon /> Remove Permission from User
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Container>
                                                </Col>
                                            )
                                        }}
                                    </Modal.Manager>
                                )
                            })}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandPermissions
