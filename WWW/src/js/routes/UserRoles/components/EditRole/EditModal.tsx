import * as React from 'react'
import { RouteManager } from '../../../../containers/RouteManager'
import { Badge, Button, Card, Dropdown, Label, LoadingOverlay, Modal, Section, Tabs } from '../../../../components'
import { UserRolesManager } from '../../containers/UserRolesManager'
import { EditIcon } from '../../../../components/icons'
import { EditFormContainer } from './EditFormContainer'
import { SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { AddPermissionFormContainer } from '../AddPermission/AddPermissionFormContainer'
import { NotificationsManager } from '../../../../containers/NotificationsManager'
import { DeleteIcon } from '../../../../components/icons'

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
                            <Modal.Container color={'primary'} visible={visible}>
                                <UserRolesManager id={id}>
                                    {({
                                        role,
                                        roles,
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
                                                                    role={role}
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
                                                            <Tabs.Content></Tabs.Content>
                                                        </Tabs.Tab>
                                                    </Tabs.Container>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button color={'secondary'} block onClick={() => close()}>
                                                        Cancel
                                                    </Button>
                                                </Modal.Footer>
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
