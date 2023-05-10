import * as React from 'react'
import { Card, LoadingOverlay } from '../../../../components'
import { EditFormContainer } from './EditFormContainer'
import { FormContainer, NotificationsManager } from '../../../../containers'
import { Permission, SetIsLoading } from '../../../../../types.d'
import AlertNoPermissions from '../../../../components/common/AlertNoPermissions'
interface EditProps {
    editPermission: EditPermission
    permission: Permission
    fetchPermission: () => Promise<void>
    isLoading: boolean
    setIsLoading: SetIsLoading
}

interface EditState {}

export class EditPermission extends React.Component<EditProps, EditState> {
    render() {
        const { editPermission, permission, fetchPermission, isLoading, setIsLoading } = this.props
        return (
            <FormContainer>
                {({ addToastNotification, canByPermission }) => (
                    <>
                        {canByPermission('permissions.edit') && (
                            <Card header={<h1>Permission</h1>} color={'primary'}>
                                <EditFormContainer
                                    initialValues={permission}
                                    save={editPermission}
                                    role={permission}
                                    fetchPermission={fetchPermission}
                                    addToastNotification={addToastNotification}
                                    setIsLoading={setIsLoading}
                                    permission={permission}
                                />
                                {isLoading && <LoadingOverlay />}
                            </Card>
                        )}
                        {!canByPermission('permissions.edit') && <AlertNoPermissions />}
                    </>
                )}
            </FormContainer>
        )
    }
}

export default { EditPermission }