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
import { UsersManager } from '../containers/UsersManager'
import { EditIcon, DeleteIcon } from '../../../components/icons'
import EditModal from './EditModal'
import AddModal from './AddModal'

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
                                                    <Table.Th xs={1}>ID</Table.Th>
                                                    <Table.Th xs={3}>Name</Table.Th>
                                                    <Table.Th xs={3}>Email</Table.Th>
                                                    <Table.Th xs={3}>Roles</Table.Th>
                                                    <Table.Th xs={2}>Actions</Table.Th>
                                                </Table.Tr>
                                            </Table.THead>
                                            <Table.TBody>
                                                {users.map((user) => {
                                                    return (
                                                        <Table.Tr key={user.id}>
                                                            <Table.Td xs={1}>{user.id}</Table.Td>
                                                            <Table.Td xs={3}>{user.name}</Table.Td>
                                                            <Table.Td xs={3}>{user.email}</Table.Td>
                                                            <Table.Td xs={3}>
                                                                <div>
                                                                    {user?.roles?.map(
                                                                        ({ id: _id, name, guard_name }) => (
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
                                                                                                fetch().then(() => {
                                                                                                    setIsLoading(false)
                                                                                                })
                                                                                            })
                                                                                        }}
                                                                                    >
                                                                                        <DeleteIcon /> Delete
                                                                                    </Dropdown.Item>
                                                                                </Dropdown.Menu>
                                                                            </Dropdown.Container>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </Table.Td>
                                                            <Table.Td xs={2}>
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
                                                                <Button
                                                                    icon={<DeleteIcon />}
                                                                    iconOnly
                                                                    color={'danger'}
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            confirmDeleteModalVisible: user.id,
                                                                        })
                                                                    }}
                                                                />
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
            </RouteManager>
        )
    }
}

export default UsersView
