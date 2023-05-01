import * as React from 'react'
import { Button, Col, Dropdown, Label, Popover, Row, Table, Tooltip } from '../../../components'
import { EditIcon } from '../../../components/icons'
import { DeleteIcon } from '../../../components/icons'
import { formatDateTime } from '../../../helpers/date-time'
import { apiURL } from '../../../helpers/api'
import { RouteManager } from '../../../containers/RouteManager'
import { DetailsIcon, ShowIcon } from '../../../components/icons'
import { Link } from 'react-router-dom'

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
            <RouteManager>
                {({ navigate }) => (
                    <Table.Container bordered striped>
                        <Table.THead>
                            <Table.Tr>
                                <Table.Th xs={1} md={1}>
                                    ID
                                </Table.Th>
                                <Table.Th xs={1} md={1}>
                                    Avatar
                                </Table.Th>
                                <Table.Th xs={11} md={3}>
                                    Name & Email
                                </Table.Th>
                                <Table.Th xs={12} md={3}>
                                    Roles
                                </Table.Th>
                                <Table.Th xs={6} md={1}>
                                    Status
                                </Table.Th>
                                <Table.Th xs={6} md={3}>
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
                                        <Table.Td xs={1} md={1}>
                                            {user?.avatar?.id != null && (
                                                <Popover.Container trigger={'hover'} placement={'right-center'}>
                                                    <Popover.Trigger>
                                                        <Button color={'info'} iconOnly icon={<ShowIcon />} />
                                                    </Popover.Trigger>
                                                    <Popover.Content>
                                                        <img
                                                            src={apiURL(
                                                                `files/preview/${user?.avatar?.id}?width=200&height=200`,
                                                            )}
                                                            style={{ maxWidth: 200 }}
                                                            alt={''}
                                                        />
                                                    </Popover.Content>
                                                </Popover.Container>
                                            )}
                                            {user?.avatar?.id == null && <>---</>}
                                        </Table.Td>
                                        <Table.Td xs={10} md={3}>
                                            <div>
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
                                        <Table.Td xs={6} md={1}>
                                            {user.status === 0 && (
                                                <Label
                                                    color={'danger'}
                                                    onClick={() => {
                                                        activateUser(user).then(() => {
                                                            fetch()
                                                        })
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                    block
                                                >
                                                    N/A
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
                                                    block
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    A
                                                </Label>
                                            )}
                                        </Table.Td>
                                        <Table.Td xs={6} md={3}>
                                            <div>
                                                <Button
                                                    icon={<EditIcon />}
                                                    iconOnly
                                                    color={'warning'}
                                                    onClick={() => {
                                                        navigate(`/users/edit?id=${user.id}`)
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
                                                <Popover.Container
                                                    placement={'left-center'}
                                                    pixelsWidth={300}
                                                    trigger={'hover'}
                                                >
                                                    <Popover.Trigger>
                                                        <Button icon={<DetailsIcon />} iconOnly color={'info'} />
                                                    </Popover.Trigger>
                                                    <Popover.Content>
                                                        <Row>
                                                            <Col xs={6}>Files:</Col>
                                                            <Col xs={6}>
                                                                {user.files_count}{' '}
                                                                <Link to={`/media?user=${user.name}`}>Show</Link>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={6}>Roles:</Col>
                                                            <Col xs={6}>
                                                                {user.roles_count}{' '}
                                                                <Link to={`/roles?user=${user.name}`}>Show</Link>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={6}>Permissions:</Col>
                                                            <Col xs={6}>
                                                                {user.permissions_count}{' '}
                                                                <Link to={`/roles?user=${user.name}`}>Show</Link>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={6}>Email verified at:</Col>
                                                            <Col xs={6}>
                                                                {user.email_verified_at != null
                                                                    ? formatDateTime(user.email_verified_at)
                                                                    : 'never'}
                                                            </Col>
                                                        </Row>
                                                    </Popover.Content>
                                                </Popover.Container>
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
                )}
            </RouteManager>
        )
    }
}

export default UsersTable
