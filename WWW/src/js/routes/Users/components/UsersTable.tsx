import * as React from 'react'
import { Button, Col, Dropdown, Label, Row, Table, Tooltip } from '../../../components'
import { EditIcon } from '../../../components/icons'
import { DeleteIcon } from '../../../components/icons'
import { formatDateTime } from '../../../helpers/date-time'
import { apiURL } from '../../../helpers/api'
interface UsersTableProps {
    users: Array<any>
    setIsLoading: Function
    deleteUserRole: Function
    fetch: Function
    deleteRole: Function
    activateUser: Function
    deactivateUser: Function
    setUserToEdit: Function
    setUserToDelete: Function
    page: number
    perPage: number
    total: number
    totalPages
}

export class UsersTable extends React.Component<UsersTableProps, null> {
    render() {
        const {
            users,
            setIsLoading,
            deleteUserRole,
            fetch,
            deleteRole,
            activateUser,
            deactivateUser,
            setUserToEdit,
            setUserToDelete,
            page,
            perPage,
            total,
            totalPages,
        } = this.props
        return (
            <Table.Container bordered striped>
                <Table.THead>
                    <Table.Tr>
                        <Table.Th xs={1} md={1}>
                            ID
                        </Table.Th>
                        <Table.Th xs={11} md={4}>
                            Name & Email
                        </Table.Th>
                        <Table.Th xs={12} md={3}>
                            Roles
                        </Table.Th>
                        <Table.Th xs={6} md={2}>
                            Status
                        </Table.Th>
                        <Table.Th xs={6} md={2}>
                            Actions
                        </Table.Th>
                    </Table.Tr>
                </Table.THead>
                <Table.TBody>
                    {users.map((user) => {
                        return (
                            <Table.Tr key={user.id}>
                                <Table.Td xs={1} md={1}>
                                    {user.id}
                                </Table.Td>
                                <Table.Td xs={11} md={4}>
                                    <div>
                                        {user?.avatar?.id != null && (
                                            <div>
                                                <img
                                                    src={apiURL(
                                                        `files/preview/${user?.avatar?.id}?width=200&height=200`,
                                                    )}
                                                    style={{ maxWidth: 48 }}
                                                />{' '}
                                            </div>
                                        )}
                                        {user.name}
                                        <br />
                                        {user.email}
                                    </div>
                                </Table.Td>
                                <Table.Td xs={12} md={3}>
                                    <div>
                                        {user?.roles?.map(
                                            ({ id: _id, name, guard_name, is_deletable: _is_deletable }) => (
                                                <Dropdown.Container size={'sm'} triggerSize={'lg'} key={_id}>
                                                    <Dropdown.Trigger size="lg" component={Label}>
                                                        {name} - {guard_name}
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            color="danger"
                                                            onClick={() => {
                                                                setIsLoading(true)

                                                                return deleteUserRole(
                                                                    {
                                                                        id: user.id,
                                                                    },
                                                                    {
                                                                        id: _id,
                                                                    },
                                                                ).then(() => {
                                                                    fetch().then(() => {
                                                                        setIsLoading(false)
                                                                    })
                                                                })
                                                            }}
                                                        >
                                                            <DeleteIcon /> Delete from User
                                                        </Dropdown.Item>
                                                        {_is_deletable == 1 && (
                                                            <Dropdown.Item
                                                                color="danger"
                                                                onClick={() => {
                                                                    setIsLoading(true)

                                                                    return deleteRole(_id).then(() => {
                                                                        fetch().then(() => {
                                                                            setIsLoading(false)
                                                                        })
                                                                    })
                                                                }}
                                                            >
                                                                <DeleteIcon /> Delete Role
                                                            </Dropdown.Item>
                                                        )}
                                                    </Dropdown.Menu>
                                                </Dropdown.Container>
                                            ),
                                        )}
                                    </div>
                                </Table.Td>
                                <Table.Td xs={6} md={2}>
                                    <Tooltip
                                        tooltip={
                                            <div>
                                                <Row>
                                                    {user.status === 1 && (
                                                        <>
                                                            <Col xs={6}>
                                                                <strong>Email verified at:</strong>
                                                            </Col>
                                                            <Col xs={6}>
                                                                {user.email_verified_at != null
                                                                    ? formatDateTime(user.email_verified_at)
                                                                    : 'never'}
                                                            </Col>
                                                        </>
                                                    )}
                                                </Row>
                                            </div>
                                        }
                                    >
                                        {user.status === 0 && (
                                            <Label
                                                color={'danger'}
                                                onClick={() => {
                                                    activateUser(user).then(() => {
                                                        fetch()
                                                    })
                                                }}
                                            >
                                                Not active
                                            </Label>
                                        )}
                                        {user.status === 1 && (
                                            <Label
                                                color={'success'}
                                                onClick={() => {
                                                    deactivateUser(user).then(() => {
                                                        fetch()
                                                    })
                                                }}
                                            >
                                                Active
                                            </Label>
                                        )}
                                    </Tooltip>
                                </Table.Td>
                                <Table.Td xs={6} md={2}>
                                    <div>
                                        <Button
                                            icon={<EditIcon />}
                                            iconOnly
                                            color={'warning'}
                                            onClick={() => {
                                                setUserToEdit(user.id)
                                            }}
                                        />
                                        {user.is_deletable == 1 && (
                                            <Button
                                                icon={<DeleteIcon />}
                                                iconOnly
                                                color={'danger'}
                                                onClick={() => {
                                                    setUserToDelete(user.id)
                                                }}
                                            />
                                        )}
                                    </div>
                                </Table.Td>
                            </Table.Tr>
                        )
                    })}
                </Table.TBody>
                <Table.TFoot alignRight>
                    <Table.Tr>
                        <Table.Td xs={12}>
                            Records:{' '}
                            <b>
                                {(page - 1) * perPage + 1} - {Math.min(perPage * page, total)} / {total}
                            </b>
                            <br />
                            Total pages: <b>{totalPages}</b>
                        </Table.Td>
                    </Table.Tr>
                </Table.TFoot>
            </Table.Container>
        )
    }
}

export default UsersTable
