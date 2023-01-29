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
} from '../../../components'
import { UserRolesManager } from '../containers/UserRolesManager'
import { EditIcon, DeleteIcon } from '../../../components/icons'
import EditModal from './EditModal'
import AddModal from './AddModal'
import { NotificationsManager } from '../../../containers/NotificationsManager'
import AddPermissionModal from './AddPermissionModal'

export class UsersView extends React.Component {
    state = {
        confirmDeleteModalVisible: false,
        edit: false,
        addModalVisible: false,
        addPermissionModalVisible: false,
    }

    render() {
        const { confirmDeleteModalVisible, edit, addModalVisible, addPermissionModalVisible } = this.state

        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <UserRolesManager>
                                {({
                                    roles,
                                    isLoading,
                                    deleteRole,
                                    fetch,
                                    setIsLoading,
                                    deletePermission,
                                    deleteUserPermission,
                                }) => {
                                    return (
                                        <PageContent>
                                            <AddModal
                                                visible={addModalVisible}
                                                close={() => {
                                                    this.setState({
                                                        addModalVisible: false,
                                                    })
                                                    fetch()
                                                }}
                                            />
                                            <AddPermissionModal
                                                visible={addPermissionModalVisible}
                                                close={() => {
                                                    this.setState({
                                                        addPermissionModalVisible: false,
                                                    })
                                                    fetch()
                                                }}
                                            />
                                            <EditModal
                                                visible={typeof edit !== 'boolean'}
                                                id={edit}
                                                close={() => {
                                                    this.setState({ edit: false })
                                                    fetch()
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
                                                                    deleteRole(confirmDeleteModalVisible).then(() => {
                                                                        fetch().then(() => {
                                                                            this.setState({
                                                                                confirmDeleteModalVisible: false,
                                                                            })
                                                                            addToastNotification({
                                                                                title: 'Delete success.',
                                                                                text: 'Role has been deleted.',
                                                                                type: 'success',
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
                                                <PageHeader.Title>Roles</PageHeader.Title>
                                                <PageHeader.Actions>
                                                    <Button
                                                        color={'success'}
                                                        onClick={() => {
                                                            this.setState({
                                                                addModalVisible: true,
                                                            })
                                                        }}
                                                    >
                                                        Add Role
                                                    </Button>
                                                    <Button
                                                        color={'success'}
                                                        onClick={() => {
                                                            this.setState({
                                                                addPermissionModalVisible: true,
                                                            })
                                                        }}
                                                    >
                                                        Add Permission
                                                    </Button>
                                                </PageHeader.Actions>
                                            </PageHeader.Container>

                                            <>
                                                {isLoading && <LoadingOverlay />}
                                                <Table.Container bordered striped>
                                                    <Table.THead>
                                                        <Table.Tr>
                                                            <Table.Th xs={1}>ID</Table.Th>
                                                            <Table.Th xs={4}>Name</Table.Th>
                                                            <Table.Th xs={4}>Permissions</Table.Th>
                                                            <Table.Th xs={3}>Actions</Table.Th>
                                                        </Table.Tr>
                                                    </Table.THead>
                                                    <Table.TBody>
                                                        {roles.map((role) => {
                                                            return (
                                                                <Table.Tr key={role.id}>
                                                                    <Table.Td xs={1}>{role.id}</Table.Td>
                                                                    <Table.Td xs={4}>{role.name}</Table.Td>
                                                                    <Table.Td xs={4}>
                                                                        <div>
                                                                            {role?.permissions?.map(
                                                                                ({
                                                                                    id: _id,
                                                                                    name,
                                                                                    guard_name,
                                                                                    is_deletable: _is_deletable,
                                                                                }) => {
                                                                                    return (
                                                                                        <div key={name}>
                                                                                            <Dropdown.Container
                                                                                                size={'sm'}
                                                                                                triggerSize={'lg'}
                                                                                            >
                                                                                                <Dropdown.Trigger
                                                                                                    size="lg"
                                                                                                    component={Label}
                                                                                                >
                                                                                                    {name} -{' '}
                                                                                                    {guard_name}
                                                                                                </Dropdown.Trigger>
                                                                                                <Dropdown.Menu>
                                                                                                    <Dropdown.Item
                                                                                                        color="danger"
                                                                                                        onClick={() => {
                                                                                                            setIsLoading(
                                                                                                                true,
                                                                                                            )

                                                                                                            return deleteUserPermission(
                                                                                                                role,
                                                                                                                {
                                                                                                                    id: _id,
                                                                                                                },
                                                                                                            ).then(
                                                                                                                () => {
                                                                                                                    fetch().then(
                                                                                                                        () => {
                                                                                                                            setIsLoading(
                                                                                                                                false,
                                                                                                                            )
                                                                                                                            addToastNotification(
                                                                                                                                {
                                                                                                                                    title: 'Delete success.',
                                                                                                                                    text: 'Permission has been deleted.',
                                                                                                                                    type: 'success',
                                                                                                                                },
                                                                                                                            )
                                                                                                                        },
                                                                                                                    )
                                                                                                                },
                                                                                                            )
                                                                                                        }}
                                                                                                    >
                                                                                                        <DeleteIcon />{' '}
                                                                                                        Remove from Role
                                                                                                    </Dropdown.Item>
                                                                                                    {_is_deletable ==
                                                                                                        1 && (
                                                                                                        <Dropdown.Item
                                                                                                            color="danger"
                                                                                                            onClick={() => {
                                                                                                                setIsLoading(
                                                                                                                    true,
                                                                                                                )

                                                                                                                return deletePermission(
                                                                                                                    {
                                                                                                                        id: _id,
                                                                                                                    },
                                                                                                                ).then(
                                                                                                                    () => {
                                                                                                                        fetch().then(
                                                                                                                            () => {
                                                                                                                                setIsLoading(
                                                                                                                                    false,
                                                                                                                                )
                                                                                                                                addToastNotification(
                                                                                                                                    {
                                                                                                                                        title: 'Delete success.',
                                                                                                                                        text: 'Permission has been deleted.',
                                                                                                                                        type: 'success',
                                                                                                                                    },
                                                                                                                                )
                                                                                                                            },
                                                                                                                        )
                                                                                                                    },
                                                                                                                )
                                                                                                            }}
                                                                                                        >
                                                                                                            <DeleteIcon />{' '}
                                                                                                            Delete
                                                                                                            Permission
                                                                                                        </Dropdown.Item>
                                                                                                    )}
                                                                                                </Dropdown.Menu>
                                                                                            </Dropdown.Container>
                                                                                        </div>
                                                                                    )
                                                                                },
                                                                            )}
                                                                        </div>
                                                                    </Table.Td>
                                                                    <Table.Td xs={3}>
                                                                        <div>
                                                                            <Button
                                                                                icon={<EditIcon />}
                                                                                iconOnly
                                                                                color={'warning'}
                                                                                onClick={() => {
                                                                                    this.setState({
                                                                                        edit: role.id,
                                                                                    })
                                                                                }}
                                                                            />
                                                                            {role.is_deletable == 1 && (
                                                                                <Button
                                                                                    icon={<DeleteIcon />}
                                                                                    iconOnly
                                                                                    color={'danger'}
                                                                                    onClick={() => {
                                                                                        this.setState({
                                                                                            confirmDeleteModalVisible:
                                                                                                role.id,
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
                            </UserRolesManager>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
