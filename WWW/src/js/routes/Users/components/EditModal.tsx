import * as React from 'react'
import { PageContent } from '../../../layouts/PageLayout/components'
import { RouteManager } from '../../../containers/RouteManager'
import {
    Alert,
    Button,
    Card,
    Dropdown,
    Label,
    LoadingOverlay,
    Modal,
    PageHeader,
    Table,
    Tabs,
} from '../../../components'
import { UsersManager } from '../containers/UsersManager'
import { EditIcon } from '../../../components/icons'
import { EditFormContainer } from './EditFormContainer'
import { SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { AddRoleFormContainer } from './AddRoleFormContainer'
import { UserRolesManager } from '../../UserRoles/containers/UserRolesManager'
import { DeleteIcon } from '../../../components/icons'
interface EditModalViewProps {
    visible: boolean
    id: number
    close?(): Function
}

export class EditModalView extends React.Component<EditModalViewProps> {
    render() {
        const { visible, id, close } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container color={'danger'} visible={visible}>
                        <UserRolesManager>
                            {({ roles }) => (
                                <UsersManager id={id}>
                                    {({
                                        user,
                                        isLoading,
                                        setIsLoading,
                                        editUser,
                                        fetch,
                                        fetchOne,
                                        addUserRole,
                                        deleteUserRole,
                                    }) => {
                                        return (
                                            <>
                                                {isLoading && <LoadingOverlay />}
                                                <Modal.Header close={close} closeIcon>
                                                    <EditIcon /> Edit User
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Tabs.Container left solid>
                                                        <Tabs.Tab name={'data'}>
                                                            <Tabs.Trigger>Data</Tabs.Trigger>
                                                            <Tabs.Content>
                                                                <EditFormContainer
                                                                    initialValues={user}
                                                                    setIsLoading={setIsLoading}
                                                                    onSubmit={(values, props) => {
                                                                        return editUser(values).then(
                                                                            () => {
                                                                                fetch().then(() => {
                                                                                    close()
                                                                                })
                                                                            },
                                                                            (response) => {
                                                                                throw new SubmissionError(
                                                                                    processAPIerrorResponseToFormErrors(
                                                                                        response,
                                                                                    ),
                                                                                )
                                                                            },
                                                                        )
                                                                    }}
                                                                />
                                                            </Tabs.Content>
                                                        </Tabs.Tab>
                                                        <Tabs.Tab name={'roles'}>
                                                            <Tabs.Trigger>Roles</Tabs.Trigger>
                                                            <Tabs.Content>
                                                                <Card header={<h1>Add Role</h1>}>
                                                                    <AddRoleFormContainer
                                                                        user={user}
                                                                        roles={roles}
                                                                        onSubmit={({ role }) => {
                                                                            setIsLoading(true)

                                                                            addUserRole(user, { id: role }).then(() => {
                                                                                fetchOne(id).then(() => {
                                                                                    fetch().then(() => {
                                                                                        setIsLoading(false)
                                                                                    })
                                                                                })
                                                                            })
                                                                        }}
                                                                    />
                                                                </Card>
                                                                <Card header={<h1>Roles</h1>}>
                                                                    {user?.roles?.map(
                                                                        ({ id: _id, name, guard_name }) => {
                                                                            return (
                                                                                <Dropdown.Container
                                                                                    size={'sm'}
                                                                                    triggerSize={'lg'}
                                                                                    key={_id}
                                                                                >
                                                                                    <Dropdown.Trigger component={Label}>
                                                                                        {name} - {guard_name}
                                                                                    </Dropdown.Trigger>
                                                                                    <Dropdown.Menu>
                                                                                        <Dropdown.Item
                                                                                            color="danger"
                                                                                            onClick={() => {
                                                                                                setIsLoading(true)

                                                                                                return deleteUserRole(
                                                                                                    user,
                                                                                                    {
                                                                                                        id: _id,
                                                                                                    },
                                                                                                ).then(() => {
                                                                                                    Promise.all([
                                                                                                        fetch(),
                                                                                                        fetchOne(id),
                                                                                                    ]).then(() => {
                                                                                                        setIsLoading(
                                                                                                            false,
                                                                                                        )
                                                                                                    })
                                                                                                })
                                                                                            }}
                                                                                        >
                                                                                            <DeleteIcon /> Delete
                                                                                        </Dropdown.Item>
                                                                                    </Dropdown.Menu>
                                                                                </Dropdown.Container>
                                                                            )
                                                                        },
                                                                    )}
                                                                </Card>
                                                            </Tabs.Content>
                                                        </Tabs.Tab>
                                                    </Tabs.Container>
                                                </Modal.Body>
                                                <Modal.Footer></Modal.Footer>
                                            </>
                                        )
                                    }}
                                </UsersManager>
                            )}
                        </UserRolesManager>
                    </Modal.Container>
                )}
            </RouteManager>
        )
    }
}

export default EditModalView
