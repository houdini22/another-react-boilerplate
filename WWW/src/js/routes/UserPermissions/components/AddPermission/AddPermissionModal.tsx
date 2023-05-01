import * as React from 'react'
import { RouteManager } from '../../../../containers/RouteManager'
import { LoadingOverlay, Modal } from '../../../../components'
import { UserRolesManager } from '../../../UserRoles/containers/UserRolesManager'
import { AddIcon } from '../../../../components/icons'
import { AddPermissionFormContainer } from './AddPermissionFormContainer'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'

interface EditModalViewProps {
    visible: boolean
    close?(): Function
}

export class AddPermissionModal extends React.Component<EditModalViewProps> {
    render() {
        const { visible, close, fetch, addToastNotification } = this.props

        return (
            <RouteManager>
                {({ navigate }) => (
                    <Modal.Container color={'primary'} visible={visible}>
                        <UserRolesManager>
                            {({ isLoading, setIsLoading, addPermission, roles, role, permissions }) => {
                                return (
                                    <>
                                        {isLoading && <LoadingOverlay />}
                                        <Modal.Header close={close} closeIcon>
                                            <AddIcon /> Add Permission
                                        </Modal.Header>
                                        <Modal.Body>
                                            <AddPermissionFormContainer
                                                roles={roles}
                                                role={role}
                                                permissions={permissions}
                                                setIsLoading={setIsLoading}
                                                addPermission={addPermission}
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
            </RouteManager>
        )
    }
}

export default AddPermissionModal
