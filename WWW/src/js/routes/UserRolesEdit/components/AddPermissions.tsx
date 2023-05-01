import * as React from 'react'
import { Card, LoadingOverlay } from '../../../components'
import { AddPermissionFormContainer } from '../../UserRoles/components/AddPermissionFormContainer'
import { processAPIerrorResponseToFormErrors } from '../../../modules/http'
import { SubmissionError } from 'redux-form'
interface HeaderProps {
    role: Object
}

export class AddPermissions extends React.Component<HeaderProps, null> {
    render() {
        const { role, roles, permissions, setIsLoading, addPermission, fetchPermissions, fetchOne, isLoading } =
            this.props
        return (
            <Card header={<h1>Add Permissions</h1>}>
                <AddPermissionFormContainer
                    initialValues={{
                        role_id: role.id,
                    }}
                    role={role}
                    roles={roles}
                    permissions={permissions}
                    onSubmit={(values) => {
                        setIsLoading(true)

                        return addPermission({ id: role.id }, { ...values, role_id: role.id }).then(
                            () => {
                                Promise.all([fetchPermissions(), fetchOne(role.id)]).then(() => {
                                    setIsLoading(false)
                                    /*addToastNotification({
                                        type: 'success',
                                        title: 'Add success.',
                                        text: 'Permissions has been saved.',
                                    })*/
                                })
                            },
                            (response) => {
                                /*addToastNotification({
                                    title: 'Form Validation Error',
                                    text: response.message,
                                    type: 'danger',
                                    href: '#',
                                })*/
                                throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
                            },
                        )
                    }}
                />
                {isLoading && <LoadingOverlay />}
            </Card>
        )
    }
}

export default AddPermissions
