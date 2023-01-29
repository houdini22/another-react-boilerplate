import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import {
    Alert,
    Button,
    Card,
    Col,
    Dropdown,
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
                        {({ roles, isLoading, deleteRole, fetch }) => {
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
                                        visible={
                                            typeof confirmDeleteModalVisible !==
                                            'boolean'
                                        }
                                        color={'danger'}
                                    >
                                        <Modal.Header
                                            closeIcon
                                            close={() => {
                                                this.setState({
                                                    confirmDeleteModalVisible:
                                                        false,
                                                })
                                            }}
                                        >
                                            Confirm Delete
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>
                                                Do you really want to delete
                                                this element?
                                            </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Row>
                                                <Col xs={6}>
                                                    <Button
                                                        color={'secondary'}
                                                        onClick={() => {
                                                            this.setState({
                                                                confirmDeleteModalVisible:
                                                                    false,
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
                                                            deleteRole(
                                                                confirmDeleteModalVisible,
                                                            ).then(() => {
                                                                fetch().then(
                                                                    () => {
                                                                        this.setState(
                                                                            {
                                                                                confirmDeleteModalVisible:
                                                                                    false,
                                                                            },
                                                                        )
                                                                    },
                                                                )
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
                                        <PageHeader.Title>
                                            Roles
                                        </PageHeader.Title>
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
                                            <Table.TBody>
                                                {roles.map((role) => {
                                                    return (
                                                        <Table.Tr key={role.id}>
                                                            <Table.Td xs={1}>
                                                                {role.id}
                                                            </Table.Td>
                                                            <Table.Td xs={8}>
                                                                {role.name}
                                                            </Table.Td>
                                                            <Table.Td xs={3}>
                                                                <Button
                                                                    icon={
                                                                        <EditIcon />
                                                                    }
                                                                    iconOnly
                                                                    color={
                                                                        'warning'
                                                                    }
                                                                    onClick={() => {
                                                                        this.setState(
                                                                            {
                                                                                edit: role.id,
                                                                            },
                                                                        )
                                                                    }}
                                                                />
                                                                <Button
                                                                    icon={
                                                                        <DeleteIcon />
                                                                    }
                                                                    iconOnly
                                                                    color={
                                                                        'danger'
                                                                    }
                                                                    onClick={() => {
                                                                        this.setState(
                                                                            {
                                                                                confirmDeleteModalVisible:
                                                                                    role.id,
                                                                            },
                                                                        )
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
                    </UserRolesManager>
                )}
            </RouteManager>
        )
    }
}

export default UsersView
