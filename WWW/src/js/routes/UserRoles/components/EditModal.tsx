import * as React from 'react'
import { RouteManager } from '../../../containers/RouteManager'
import { Badge, Card, Dropdown, Label, LoadingOverlay, Modal, Section, Tabs } from '../../../components'
import { UserRolesManager } from '../containers/UserRolesManager'
import { EditIcon } from '../../../components/icons'
import { EditFormContainer } from './EditFormContainer'
import { SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { AddPermissionFormContainer } from './AddPermissionFormContainer'
import { NotificationsManager } from '../../../containers/NotificationsManager'
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
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <Modal.Container color={'danger'} visible={visible}>
                                <UserRolesManager id={id}>
                                    {({
                                        role,
                                        isLoading,
                                        setIsLoading,
                                        editRole,
                                        fetch,
                                        addPermission,
                                        fetchOne,
                                        deletePermission,
                                        permissions,
                                        fetchPermissions,
                                        deleteUserPermission,
                                    }) => {
                                        return (
                                            <>
                                                {isLoading && <LoadingOverlay />}
                                                <Modal.Header close={close} closeIcon>
                                                    <EditIcon /> Edit Role
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Tabs.Container left solid>
                                                        <Tabs.Tab name="data">
                                                            <Tabs.Trigger>Data</Tabs.Trigger>
                                                            <Tabs.Content>
                                                                <EditFormContainer
                                                                    initialValues={{
                                                                        role_id: role.id,
                                                                    }}
                                                                    setIsLoading={setIsLoading}
                                                                    onSubmit={(values, props) => {
                                                                        return editRole(values).then(
                                                                            () => {
                                                                                fetch().then(() => {
                                                                                    close()
                                                                                })
                                                                                addToastNotification({
                                                                                    type: 'success',
                                                                                    title: 'Save success.',
                                                                                    text: 'Role has been saved.',
                                                                                })
                                                                            },
                                                                            (response) => {
                                                                                addToastNotification({
                                                                                    type: 'danger',
                                                                                    title: 'Save failed.',
                                                                                    text: response.message.message,
                                                                                })
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
                                                        <Tabs.Tab name="permissions">
                                                            <Tabs.Trigger>
                                                                Permissions{' '}
                                                                <Badge color={'info'}>
                                                                    {role?.permissions?.length}
                                                                </Badge>
                                                            </Tabs.Trigger>
                                                            <Tabs.Content>
                                                                <Card header={<h1>Add Permissions</h1>}>
                                                                    <AddPermissionFormContainer
                                                                        initialValues={{
                                                                            role_id: role.id,
                                                                        }}
                                                                        role={role}
                                                                        permissions={permissions}
                                                                        onSubmit={(values) => {
                                                                            setIsLoading(true)

                                                                            return addPermission(
                                                                                { id: role.id },
                                                                                { ...values, role_id: role.id },
                                                                            ).then(
                                                                                () => {
                                                                                    Promise.all([
                                                                                        fetchPermissions(),
                                                                                        fetchOne(id),
                                                                                        fetch(),
                                                                                    ]).then(() => {
                                                                                        setIsLoading(false)
                                                                                        addToastNotification({
                                                                                            type: 'success',
                                                                                            title: 'Add success.',
                                                                                            text: 'Permissions has been saved.',
                                                                                        })
                                                                                    })
                                                                                },
                                                                                (response) => {
                                                                                    addToastNotification({
                                                                                        title: 'Form Validation Error',
                                                                                        text: response.message,
                                                                                        type: 'danger',
                                                                                        href: '#',
                                                                                    })
                                                                                    throw new SubmissionError(
                                                                                        processAPIerrorResponseToFormErrors(
                                                                                            response,
                                                                                        ),
                                                                                    )
                                                                                },
                                                                            )
                                                                        }}
                                                                    />
                                                                </Card>
                                                                <Card header={<h1>Permissions</h1>}>
                                                                    {role?.permissions?.map(
                                                                        ({
                                                                            id: _id,
                                                                            name,
                                                                            guard_name,
                                                                            is_deletable,
                                                                        }) => {
                                                                            return (
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

                                                                                                return deleteUserPermission(
                                                                                                    role,
                                                                                                    {
                                                                                                        id: _id,
                                                                                                    },
                                                                                                ).then(() => {
                                                                                                    addToastNotification(
                                                                                                        {
                                                                                                            type: 'success',
                                                                                                            title: 'Delete success.',
                                                                                                            text: 'Permission has been removed.',
                                                                                                        },
                                                                                                    )
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
                                                                                            <DeleteIcon /> Remove from
                                                                                            user
                                                                                        </Dropdown.Item>
                                                                                        {is_deletable == 1 && (
                                                                                            <Dropdown.Item
                                                                                                color="danger"
                                                                                                onClick={() => {
                                                                                                    setIsLoading(true)

                                                                                                    return deletePermission(
                                                                                                        {
                                                                                                            id: _id,
                                                                                                        },
                                                                                                    ).then(() => {
                                                                                                        addToastNotification(
                                                                                                            {
                                                                                                                type: 'success',
                                                                                                                title: 'Delete success.',
                                                                                                                text: 'Permission has been deleted.',
                                                                                                            },
                                                                                                        )
                                                                                                        Promise.all([
                                                                                                            fetch(),
                                                                                                            fetchOne(
                                                                                                                id,
                                                                                                            ),
                                                                                                        ]).then(() => {
                                                                                                            setIsLoading(
                                                                                                                false,
                                                                                                            )
                                                                                                        })
                                                                                                    })
                                                                                                }}
                                                                                            >
                                                                                                <DeleteIcon /> Delete
                                                                                                Permission
                                                                                            </Dropdown.Item>
                                                                                        )}
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
                                </UserRolesManager>
                            </Modal.Container>
                        )}
                    </NotificationsManager>
                )}
            </RouteManager>
        )
    }
}

export default EditModalView
