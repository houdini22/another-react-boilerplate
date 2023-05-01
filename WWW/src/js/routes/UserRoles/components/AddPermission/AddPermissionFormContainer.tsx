import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddPermissionForm as FormComponent } from './AddPermissionForm'
import { reduxForm, formValueSelector } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { SubmissionError } from 'redux-form'

const onSubmit = (
    values,
    _,
    { setIsLoading, addPermission, role, fetchPermissions, fetchOne, addToastNotification },
) => {
    setIsLoading(true)

    return addPermission({ id: role.id }, { ...values, role_id: role.id, guard_name: 'web' }).then(
        () => {
            Promise.all([fetchPermissions(), fetchOne(role.id)]).then(() => {
                setIsLoading(false)
                addToastNotification({
                    type: 'success',
                    title: 'Save success.',
                    text: 'Role has been saved.',
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
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const AddPermissionFormContainer = compose(
    connect((state, props) => {
        const selector = formValueSelector('AddPermissionForm')
        const permission = selector(state, 'permission')
        return {
            permission,
        }
    }),
    reduxForm({
        onSubmit,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddPermissionForm',
        initialValues: {
            name: '',
            guard_name: 'web',
            role_id: 0,
            permission: 'add',
        },
    }),
)(FormComponent)

export { AddPermissionFormContainer }
export default { AddPermissionFormContainer }
