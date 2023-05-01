import * as React from 'react'
import { RouteManager } from '../../../../containers/RouteManager'
import { Alert, Button, Card, Dropdown, LoadingOverlay, Modal, PageHeader, Table } from '../../../../components'
import { UserRolesManager } from '../../containers/UserRolesManager'
import { AddIcon } from '../../../../components/icons'
import { AddPermissionFormContainer } from './AddPermissionFormContainer'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { SubmissionError } from 'redux-form'

interface EditModalViewProps {
    visible: boolean
    id: number
    close?(): Function
}

export class AddPermissionModal extends React.Component<EditModalViewProps> {
    render() {
        const { visible, id, close } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container color={'danger'} visible={visible}>
                        <UserRolesManager id={id}>
                            {({ isLoading, setIsLoading, addPermission, fetch, roles, role, permissions }) => {
                                return (
                                    <>
                                        {isLoading && <LoadingOverlay />}
                                        <Modal.Header close={close} closeIcon>
                                            <AddIcon /> Add Permission
                                        </Modal.Header>
                                        <Modal.Body>
                                            <AddPermissionFormContainer
                                                initialValues={{
                                                    permission: 'add',
                                                    role_id: role.id || 0,
                                                    name: '',
                                                    guard_name: '',
                                                }}
                                                roles={roles}
                                                role={role}
                                                permissions={permissions}
                                                setIsLoading={setIsLoading}
                                                onSubmit={(values, props) => {
                                                    if (!values.role_id) {
                                                        return
                                                    }
                                                    return addPermission({ id: values.role_id }, values).then(
                                                        (data) => {
                                                            fetch().then(() => close())
                                                        },
                                                        (response) => {
                                                            throw new SubmissionError(
                                                                processAPIerrorResponseToFormErrors(response),
                                                            )
                                                        },
                                                    )
                                                }}
                                            />
                                        </Modal.Body>
                                    </>
                                )
                            }}
                        </UserRolesManager>
                    </Modal.Container>
                )}
            </RouteManager>
        )
    }
}

export default AddPermissionModal
