import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import {
    Alert,
    Button,
    Card,
    Col,
    Dropdown,
    Label,
    LoadingOverlay,
    Modal,
    PageHeader,
    Row,
    Table,
    Tooltip,
} from '../../../components'
import { UsersManager } from '../containers/UsersManager'
import { EditIcon, DeleteIcon } from '../../../components/icons'
import EditModal from './EditModal'
import AddModal from './AddModal'
import { formatDateTime } from '../../../helpers/date-time'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { apiURL } from '../../../helpers/api'

export class UsersView extends React.Component {
    state = {
        confirmDeleteModalVisible: false,
        edit: false,
        addModalVisible: false,
    }

    render() {
        const { confirmDeleteModalVisible, edit, addModalVisible } = this.state

        return (
            <RouteManager>
                {({ navigate }) => (
                    <UserRolesManager>
                        {({ deleteRole }) => (
                            <UsersManager>
                                {({ users, isLoading, deleteUser, fetch, deleteUserRole, setIsLoading }) => {
                                    return (
                                        <PageContent>
                                            <AddModal
                                                visible={addModalVisible}
                                                close={() => {
                                                    this.setState({
                                                        addModalVisible: false,
                                                    })
                                                }}
                                            />
                                            <EditModal
                                                visible={typeof edit !== 'boolean'}
                                                id={edit}
                                                close={() => {
                                                    this.setState({ edit: false })
                                                }}
                                            />
                                            <Modal.Container
                                                visible={typeof confirmDeleteModalVisible !== 'boolean'}
                                                color={'danger'}
                                            >
                                                <Modal.Header
                                                    closeIcon
                                                    close={() => {
                                                        this.setState({
                                                            confirmDeleteModalVisible: false,
                                                        })
                                                    }}
                                                >
                                                    Confirm Delete
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <p>Do you really want to delete this element?</p>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Row>
                                                        <Col xs={6}>
                                                            <Button
                                                                color={'secondary'}
                                                                onClick={() => {
                                                                    this.setState({
                                                                        confirmDeleteModalVisible: false,
                                                                    })
                                                                }}
                                                                block
                                                            >
                                                                Cancel
                                                            </Button>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <Button
                                                                color={'success'}
                                                                onClick={() => {
                                                                    deleteUser(confirmDeleteModalVisible).then(() => {
                                                                        fetch().then(() => {
                                                                            this.setState({
                                                                                confirmDeleteModalVisible: false,
                                                                            })
                                                                        })
                                                                    })
                                                                }}
                                                                block
                                                            >
                                                                OK
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Modal.Footer>
                                            </Modal.Container>
                                            <PageHeader.Container>
                                                <PageHeader.Title>Users</PageHeader.Title>
                                                <PageHeader.Actions>
                                                    <Button
                                                        color={'success'}
                                                        onClick={() => {
                                                            this.setState({
                                                                addModalVisible: true,
                                                            })
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </PageHeader.Actions>
                                            </PageHeader.Container>

                                            <>
                                                {isLoading && <LoadingOverlay />}
                                                <Table.Container bordered striped>
                                                    <Table.THead>
                                                        <Table.Tr>
                                                            <Table.Th xs={1} md={1}>
                                                                ID
                                                            </Table.Th>
                                                            <Table.Th xs={5} md={2}>
                                                                Name
                                                            </Table.Th>
                                                            <Table.Th xs={6} md={2}>
                                                                Email
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
                                                                    <Table.Td xs={5} md={2}>
                                                                        {user?.avatar?.id != null && (
                                                                            <div>
                                                                                <img
                                                                                    src={apiURL(
                                                                                        `files/preview/${user?.avatar?.id}?width=200&height=200`,
                                                                                    )}
                                                                                    style={{ maxWidth: 64 }}
                                                                                />{' '}
                                                                                {user.name}
                                                                            </div>
                                                                        )}
                                                                        {user.avatar_id == 0 && user.name}
                                                                    </Table.Td>
                                                                    <Table.Td xs={6} md={2}>
                                                                        {user.email}
                                                                    </Table.Td>
                                                                    <Table.Td xs={12} md={3}>
                                                                        <div>
                                                                            {user?.roles?.map(
                                                                                ({
                                                                                    id: _id,
                                                                                    name,
                                                                                    guard_name,
                                                                                    is_deletable: _is_deletable,
                                                                                }) => (
                                                                                    <Dropdown.Container
                                                                                        size={'sm'}
                                                                                        triggerSize={'lg'}
                                                                                        key={_id}
                                                                                    >
                                                                                        <Dropdown.Trigger
                                                                                            size="lg"
                                                                                            component={Label}
                                                                                        >
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
                                                                                                from User
                                                                                            </Dropdown.Item>
                                                                                            {_is_deletable == 1 && (
                                                                                                <Dropdown.Item
                                                                                                    color="danger"
                                                                                                    onClick={() => {
                                                                                                        setIsLoading(
                                                                                                            true,
                                                                                                        )

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
                                                                                                    <DeleteIcon />{' '}
                                                                                                    Delete Role
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
                                                                                                    <strong>
                                                                                                        Email verified
                                                                                                        at:
                                                                                                    </strong>
                                                                                                </Col>
                                                                                                <Col xs={6}>
                                                                                                    {user.email_verified_at !=
                                                                                                    null
                                                                                                        ? formatDateTime(
                                                                                                              user.email_verified_at,
                                                                                                          )
                                                                                                        : 'never'}
                                                                                                </Col>
                                                                                            </>
                                                                                        )}
                                                                                    </Row>
                                                                                </div>
                                                                            }
                                                                        >
                                                                            {user.status === 0 && (
                                                                                <Label color={'danger'}>
                                                                                    Not active
                                                                                </Label>
                                                                            )}
                                                                            {user.status === 1 && (
                                                                                <Label color={'success'}>Active</Label>
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
                                                                                    this.setState({
                                                                                        edit: user.id,
                                                                                    })
                                                                                }}
                                                                            />
                                                                            {user.is_deletable == 1 && (
                                                                                <Button
                                                                                    icon={<DeleteIcon />}
                                                                                    iconOnly
                                                                                    color={'danger'}
                                                                                    onClick={() => {
                                                                                        this.setState({
                                                                                            confirmDeleteModalVisible:
                                                                                                user.id,
                                                                                        })
                                                                                    }}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                            )
                                                        })}
                                                    </Table.TBody>
                                                </Table.Container>
                                            </>
                                        </PageContent>
                                    )
                                }}
                            </UsersManager>
                        )}
                    </UserRolesManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
