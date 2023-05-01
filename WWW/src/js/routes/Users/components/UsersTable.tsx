import * as React from 'react'
import { Button, Col, Dropdown, Label, Popover, Row, Table, Typography } from '../../../components'
import { formatDateTime } from '../../../helpers/date-time'
import { apiURL } from '../../../helpers/api'
import { RouteManager } from '../../../containers/RouteManager'
import {
    DetailsIcon,
    UserIcon,
    RoleIcon,
    FileIcon,
    AvatarIcon,
    InfoIcon,
    EditIcon,
    DeleteIcon,
} from '../../../components/icons'
import { TableSummary } from '../../../components/common/List/TableSummary'

interface UsersTableProps {
    users: Array<any>
    setIsLoading: Function
    deleteUserRole: Function
    fetch: Function
    deleteRole: Function
    activateUser: Function
    deactivateUser: Function
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
            setUserToDelete,
            page,
            perPage,
            total,
            totalPages,
            deleteUserPermission,
            deletePermission,
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
                                <Table.Th xs={11} md={3}>
                                    Name & Email
                                </Table.Th>
                                <Table.Th xs={12} md={4}>
                                    Resources
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
                                const permissionsFromRoles = {}

                                user?.roles?.forEach(({ permissions }) => {
                                    permissions?.forEach(({ name, ...rest }) => {
                                        if (permissionsFromRoles[name]) {
                                            if (!permissionsFromRoles[name].occurence) {
                                                permissionsFromRoles[name].occurence = 1
                                            }
                                            permissionsFromRoles[name].occurence++
                                        } else {
                                            permissionsFromRoles[name] = { name, ...rest }
                                        }
                                    })
                                })

                                user?.permissions?.forEach(({ id, guard_name, is_deletable, name, ...rest }) => {
                                    if (permissionsFromRoles[name]) {
                                        if (!permissionsFromRoles[name].occurence) {
                                            permissionsFromRoles[name].occurence = 1
                                        }
                                        permissionsFromRoles[name].occurence++
                                    } else {
                                        permissionsFromRoles[name] = { name, id, guard_name, is_deletable, ...rest }
                                    }
                                })

                                return (
                                    <Table.Tr key={user.id}>
                                        <Table.Td xs={1} md={1}>
                                            {user.id}
                                        </Table.Td>
                                        <Table.Td xs={10} md={3}>
                                            <div>
                                                {user.name}
                                                <br />
                                                {user.email}
                                            </div>
                                        </Table.Td>
                                        <Table.Td xs={12} md={4} alignCenter>
                                            <div>
                                                {user?.roles?.length > 0 && (
                                                    <Popover.Container
                                                        trigger={'hover'}
                                                        placement={'left-center'}
                                                        pixelsWidth={300}
                                                    >
                                                        <Popover.Trigger>
                                                            <Button
                                                                color={'info'}
                                                                icon={<RoleIcon />}
                                                                onClick={() => navigate(`/roles?user=${user.name}`)}
                                                            >
                                                                {user?.roles?.length || 0}
                                                            </Button>
                                                        </Popover.Trigger>
                                                        <Popover.Content scrollY>
                                                            <Typography.Container>
                                                                <h4>Roles</h4>
                                                            </Typography.Container>
                                                            {user?.roles
                                                                ?.sort(({ name: nameA }, { name: nameB }) =>
                                                                    nameA.localeCompare(nameB),
                                                                )
                                                                .map(
                                                                    ({
                                                                        id: _id,
                                                                        name,
                                                                        guard_name,
                                                                        is_deletable: _is_deletable,
                                                                        pivot: { model_type = '' } = {},
                                                                    }) => {
                                                                        return (
                                                                            <div>
                                                                                <Dropdown.Container
                                                                                    triggerSize={'lg'}
                                                                                    key={_id}
                                                                                >
                                                                                    <Dropdown.Trigger
                                                                                        size="lg"
                                                                                        componentProps={{ block: true }}
                                                                                        component={Label}
                                                                                    >
                                                                                        {name} - {guard_name}
                                                                                    </Dropdown.Trigger>
                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item type={'header'}>
                                                                                            <InfoIcon /> Role ID: ${_id}
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item
                                                                                            color={'info'}
                                                                                            onClick={() => {
                                                                                                navigate(
                                                                                                    `/permissions?roles=${_id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            <DetailsIcon /> Show
                                                                                            Permissions
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item
                                                                                            color={'info'}
                                                                                            onClick={() => {
                                                                                                navigate(
                                                                                                    `/users?roles=${_id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            <DetailsIcon /> Show Users
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item
                                                                                            color={'warning'}
                                                                                            onClick={() => {
                                                                                                navigate(
                                                                                                    `/roles/edit?id=${_id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            <EditIcon /> Edit Role
                                                                                        </Dropdown.Item>
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
                                                                                                        setIsLoading(
                                                                                                            false,
                                                                                                        )
                                                                                                    })
                                                                                                })
                                                                                            }}
                                                                                        >
                                                                                            <DeleteIcon /> Delete Role
                                                                                            from User
                                                                                        </Dropdown.Item>
                                                                                        {_is_deletable == 1 && (
                                                                                            <Dropdown.Item
                                                                                                color="danger"
                                                                                                onClick={() => {
                                                                                                    setIsLoading(true)

                                                                                                    return deleteRole(
                                                                                                        _id,
                                                                                                    ).then(() => {
                                                                                                        fetch().then(
                                                                                                            () => {
                                                                                                                setIsLoading(
                                                                                                                    false,
                                                                                                                )
                                                                                                            },
                                                                                                        )
                                                                                                    })
                                                                                                }}
                                                                                            >
                                                                                                <DeleteIcon /> Delete
                                                                                                Role
                                                                                            </Dropdown.Item>
                                                                                        )}
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown.Container>
                                                                            </div>
                                                                        )
                                                                    },
                                                                )}
                                                        </Popover.Content>
                                                    </Popover.Container>
                                                )}
                                                {Object.keys(permissionsFromRoles).length > 0 && (
                                                    <Popover.Container
                                                        trigger={'hover'}
                                                        placement={'left-center'}
                                                        pixelsWidth={300}
                                                    >
                                                        <Popover.Trigger>
                                                            <Button
                                                                color={'info'}
                                                                icon={<RoleIcon />}
                                                                onClick={() =>
                                                                    navigate(`/permissions?user=${user.name}`)
                                                                }
                                                            >
                                                                {Object.keys(permissionsFromRoles).length || 0}
                                                            </Button>
                                                        </Popover.Trigger>
                                                        <Popover.Content scrollY>
                                                            <Typography.Container>
                                                                <h4>Permissions</h4>
                                                            </Typography.Container>
                                                            {Object.keys(permissionsFromRoles)
                                                                ?.map((key) => permissionsFromRoles[key])
                                                                .sort(({ name: nameA }, { name: nameB }) =>
                                                                    nameA.localeCompare(nameB),
                                                                )
                                                                .map(
                                                                    ({
                                                                        id: _id,
                                                                        name,
                                                                        guard_name,
                                                                        is_deletable: _is_deletable,
                                                                        pivot: { model_type = '' } = {},
                                                                    }) => {
                                                                        return (
                                                                            <div>
                                                                                <Dropdown.Container
                                                                                    triggerSize={'lg'}
                                                                                    key={_id}
                                                                                >
                                                                                    <Dropdown.Trigger
                                                                                        size="lg"
                                                                                        componentProps={{ block: true }}
                                                                                        component={Label}
                                                                                    >
                                                                                        {name} - {guard_name}
                                                                                    </Dropdown.Trigger>
                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item type={'header'}>
                                                                                            <InfoIcon /> Permission ID:
                                                                                            ${_id}
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item
                                                                                            color={'info'}
                                                                                            onClick={() => {
                                                                                                setIsLoading(true)

                                                                                                return navigate(
                                                                                                    `/roles?permissions=${_id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            <RoleIcon /> Show Roles
                                                                                        </Dropdown.Item>
                                                                                        <Dropdown.Item
                                                                                            color={'info'}
                                                                                            onClick={() => {
                                                                                                setIsLoading(true)

                                                                                                return navigate(
                                                                                                    `/users?permissions=${_id}`,
                                                                                                )
                                                                                            }}
                                                                                        >
                                                                                            <UserIcon /> Show Users
                                                                                        </Dropdown.Item>
                                                                                        {model_type.match(/User/) && (
                                                                                            <Dropdown.Item
                                                                                                color="danger"
                                                                                                onClick={() => {
                                                                                                    setIsLoading(true)

                                                                                                    return deleteUserPermission(
                                                                                                        {
                                                                                                            id: _id,
                                                                                                        },
                                                                                                        {
                                                                                                            id: user.id,
                                                                                                        },
                                                                                                    ).then(() => {
                                                                                                        fetch().then(
                                                                                                            () => {
                                                                                                                setIsLoading(
                                                                                                                    false,
                                                                                                                )
                                                                                                            },
                                                                                                        )
                                                                                                    })
                                                                                                }}
                                                                                            >
                                                                                                <DeleteIcon /> Delete
                                                                                                Permission from User
                                                                                            </Dropdown.Item>
                                                                                        )}
                                                                                        {_is_deletable == 1 && (
                                                                                            <Dropdown.Item
                                                                                                color="danger"
                                                                                                onClick={() => {
                                                                                                    setIsLoading(true)

                                                                                                    return deletePermission(
                                                                                                        _id,
                                                                                                    ).then(() => {
                                                                                                        fetch().then(
                                                                                                            () => {
                                                                                                                setIsLoading(
                                                                                                                    false,
                                                                                                                )
                                                                                                            },
                                                                                                        )
                                                                                                    })
                                                                                                }}
                                                                                            >
                                                                                                <DeleteIcon /> Delete
                                                                                                Permission Permanently
                                                                                            </Dropdown.Item>
                                                                                        )}
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown.Container>
                                                                            </div>
                                                                        )
                                                                    },
                                                                )}
                                                        </Popover.Content>
                                                    </Popover.Container>
                                                )}
                                                {user.files_count > 0 && (
                                                    <Button
                                                        color={'info'}
                                                        icon={<FileIcon />}
                                                        onClick={() => navigate(`/media?user=${user.name}`)}
                                                    >
                                                        {user.files_count}
                                                    </Button>
                                                )}
                                                {user?.avatar?.id != null && (
                                                    <Popover.Container trigger={'hover'} placement={'left-center'}>
                                                        <Popover.Trigger>
                                                            <Button color={'info'} iconOnly icon={<AvatarIcon />} />
                                                        </Popover.Trigger>
                                                        <Popover.Content>
                                                            <a
                                                                href={apiURL(`files/preview/${user?.avatar?.id}`)}
                                                                target={'_blank'}
                                                            >
                                                                <img
                                                                    src={apiURL(
                                                                        `files/preview/${user?.avatar?.id}?width=200&height=200`,
                                                                    )}
                                                                    style={{ maxWidth: 200 }}
                                                                    alt={''}
                                                                />
                                                            </a>
                                                        </Popover.Content>
                                                    </Popover.Container>
                                                )}
                                            </div>
                                        </Table.Td>
                                        <Table.Td xs={6} md={2}>
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
                                                    Not Active
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
                                                    Active
                                                </Label>
                                            )}
                                        </Table.Td>
                                        <Table.Td xs={6} md={2}>
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
                                                            <Col xs={5}>Created at:</Col>
                                                            <Col xs={7}>
                                                                {user.created_at != null
                                                                    ? formatDateTime(user.created_at)
                                                                    : 'never'}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={5}>Last edit:</Col>
                                                            <Col xs={7}>
                                                                {user.updated_at != null
                                                                    ? formatDateTime(user.updated_at)
                                                                    : 'never'}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={5}>Last edit:</Col>
                                                            <Col xs={7}>
                                                                {user.last_active != null
                                                                    ? formatDateTime(user.last_active)
                                                                    : 'never'}
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={5}>Email verified at:</Col>
                                                            <Col xs={7}>
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
                        <TableSummary page={page} perPage={perPage} total={total} totalPages={totalPages} />
                    </Table.Container>
                )}
            </RouteManager>
        )
    }
}

export default UsersTable
