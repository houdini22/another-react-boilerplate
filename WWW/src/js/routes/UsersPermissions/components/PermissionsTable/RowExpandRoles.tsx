import * as React from 'react'
import { Col, Dropdown, Label, Modal, Row, Table, Typography } from '../../../../components'
import { DeleteIcon, DetailsIcon, EditIcon, InfoIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { sortRolesByNameAscending } from '../../../../helpers/roles'

interface RowExpandRolesProps {}

export class RowExpandRoles extends React.Component<RowExpandRolesProps, null> {
    render() {
        const { permission, navigate, deleteRolePermission, setIsLoading, addToastNotification, fetch } = this.props

        return (
            <Table.Tr key={`roles${permission.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>Roles with Permission</h3>
                            </Typography.Container>
                        </Col>
                        {sortRolesByNameAscending(permission?.roles).map(
                            ({ id: _id, name, is_deletable: _is_deletable }) => {
                                return (
                                    <Modal.Manager key={_id}>
                                        {({ registerModal, closeModal, openModal }) => {
                                            registerModal(
                                                `role-permission-${permission.id}-delete`,
                                                <ModalConfirm
                                                    onConfirm={() => {
                                                        setIsLoading(true)

                                                        return deleteRolePermission(
                                                            {
                                                                id: _id,
                                                            },
                                                            permission,
                                                        ).then(() => {
                                                            fetch().then(() => {
                                                                setIsLoading(false)
                                                                addToastNotification({
                                                                    title: 'Delete success.',
                                                                    text: `Permission ID: ${permission.id} has been removed from Role ID: ${_id}.`,
                                                                    type: 'success',
                                                                    href: '/permissions',
                                                                })
                                                                closeModal(`role-permission-${permission.id}-delete`)
                                                            })
                                                        })
                                                    }}
                                                    onCancel={() =>
                                                        closeModal(`role-permission-${permission.id}-delete`)
                                                    }
                                                >
                                                    <p>
                                                        Are you sure to delete Permission: <b>{permission.name}</b> from
                                                        Role: <b>{name}</b>?
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
                                                                <InfoIcon /> Role ID: {_id}
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'info'}
                                                                onClick={() => {
                                                                    navigate(`/permissions?roles=${_id}`)
                                                                }}
                                                            >
                                                                <DetailsIcon /> Show Permissions from Role
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'info'}
                                                                onClick={() => {
                                                                    navigate(`/users?roles=${_id}`)
                                                                }}
                                                            >
                                                                <DetailsIcon /> Show Users with Role
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'info'}
                                                                onClick={() => {
                                                                    navigate(`/permissions?roles=${_id}`)
                                                                }}
                                                            >
                                                                <DetailsIcon /> Show Role Permissions
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color={'warning'}
                                                                onClick={() => {
                                                                    navigate(`/roles/edit?id=${_id}`)
                                                                }}
                                                            >
                                                                <EditIcon /> Edit Role
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                                color="danger"
                                                                onClick={() => {
                                                                    openModal(`role-permission-${permission.id}-delete`)
                                                                }}
                                                            >
                                                                <DeleteIcon /> Remove Permission from Role
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown.Container>
                                                </Col>
                                            )
                                        }}
                                    </Modal.Manager>
                                )
                            },
                        )}
                    </Row>
                </Table.Td>
            </Table.Tr>
        )
    }
}

export default RowExpandRoles
