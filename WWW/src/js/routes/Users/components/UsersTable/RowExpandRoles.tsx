import * as React from 'react'
import { Col, Dropdown, Label, Table, Row, Typography } from '../../../../components'
import { DeleteIcon, DetailsIcon, EditIcon } from '../../../../components/icons'
import { ModalConfirm } from '../../../../components/common/ModalConfirm'
import { User } from '../../../../../types.d'
import { sortRolesByNameAscending } from '../../../../helpers/roles'

interface RowExpandRolesProps {
    user: User
    navigate: Function
    setIsLoading: Function
    deleteUserRole: Function
    addToastNotification: Function
    fetch: Function
}

export class RowExpandRoles extends React.Component<RowExpandRolesProps, null> {
    render() {
        const {
            user,
            navigate,
            setIsLoading,
            deleteUserRole,
            addToastNotification,
            fetch,
            registerModal,
            closeModal,
            openModal,
        } = this.props

        return (
            <Table.Tr key={`roles${user.id}`}>
                <Table.Td xs={12}>
                    <Row>
                        <Col xs={12}>
                            <Typography.Container>
                                <h3>User Roles</h3>
                            </Typography.Container>
                        </Col>
                        {sortRolesByNameAscending(user?.roles).map(({ id: _id, name, is_deletable: _is_deletable }) => {
                            registerModal(
                                `user-remove-role-${_id}-delete`,
                                <ModalConfirm
                                    onConfirm={() => {
                                        setIsLoading(true)

                                        deleteUserRole(
                                            {
                                                id: user.id,
                                            },
                                            {
                                                id: _id,
                                            },
                                        ).then(() => {
                                            fetch().then(() => {
                                                setIsLoading(false)
                                                addToastNotification({
                                                    title: 'Remove success.',
                                                    text: `Role ID: ${_id} has been removed from User ID: ${user.id}.`,
                                                    type: 'success',
                                                    href: '/users',
                                                })
                                                closeModal(`user-remove-role-${_id}-delete`)
                                            })
                                        })
                                    }}
                                    onCancel={() => closeModal(`user-remove-role-${_id}-delete`)}
                                >
                                    <p>
                                        Are you sure to delete Role: <b>{name}</b> from User <b>{user.name}</b>?
                                    </p>
                                </ModalConfirm>,
                            )

                            return (
                                <Col xs={4} key={`${_id}`}>
                                    <Dropdown.Container triggerSize={'lg'} key={_id}>
                                        <Dropdown.Trigger size="lg" componentProps={{ block: true }} component={Label}>
                                            {name}
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                color={'info'}
                                                onClick={() => {
                                                    navigate(`/permissions?roles=${_id}`)
                                                }}
                                            >
                                                <DetailsIcon /> Show Role Permissions
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
                                                    openModal(`user-remove-role-${_id}-delete`)
                                                }}
                                            >
                                                <DeleteIcon /> Remove Role from User
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

export default RowExpandRoles
