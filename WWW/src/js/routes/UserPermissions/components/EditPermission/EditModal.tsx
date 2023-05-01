import * as React from 'react'
import { RouteManager } from '../../../../containers/RouteManager'
import { Badge, Button, Card, Dropdown, Label, LoadingOverlay, Modal, Section, Tabs } from '../../../../components'
import { UserRolesManager } from '../../../UserRoles/containers/UserRolesManager'
import { EditIcon } from '../../../../components/icons'
import { EditFormContainer } from './EditFormContainer'
import { SubmissionError } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { NotificationsManager } from '../../../../containers/NotificationsManager'

interface EditModalViewProps {
    visible: boolean
    id: number

    close?(): Function
}

export class EditModal extends React.Component<EditModalViewProps> {
    render() {
        const { visible, id, close, fetch } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <NotificationsManager>
                        {({ addToastNotification }) => (
                            <Modal.Container color={'primary'} visible={visible}>
                                <UserRolesManager permissionId={id}>
                                    {({ permission, isLoading, setIsLoading, editPermission }) => {
                                        return (
                                            <>
                                                {isLoading && <LoadingOverlay />}
                                                <Modal.Header close={close} closeIcon>
                                                    <EditIcon /> Edit Permission
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <EditFormContainer
                                                        initialValues={permission}
                                                        setIsLoading={setIsLoading}
                                                        editPermission={editPermission}
                                                        fetch={fetch}
                                                        close={close}
                                                        addToastNotification={addToastNotification}
                                                    />
                                                </Modal.Body>
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

export default EditModal
