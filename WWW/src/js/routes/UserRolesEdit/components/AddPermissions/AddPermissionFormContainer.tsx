import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AddPermissionForm as FormComponent } from './AddPermissionForm'
import { reduxForm, formValueSelector } from 'redux-form'
import { processAPIerrorResponseToFormErrors } from '../../../../modules/http'
import { SubmissionError } from 'redux-form'

const validate = (values) => {
    const errors = {}

    if (!values.permission) {
        errors['permission'] = 'Required.'
    }

    return errors
}

const onSubmit = (values, _, { setIsLoading, addPermission, role, fetchPermissions, fetchOne, addToastNotification, reset }) => {
    setIsLoading(true)

    return addPermission({ ...values, role_id: role.id, guard_name: 'web' }).then(
        () => {
            Promise.all([fetchPermissions(), fetchOne(role.id)]).then(() => {
                setIsLoading(false)
                addToastNotification({
                    type: 'success',
                    title: 'Save success.',
                    text: `Role ID: ${role.id} has been saved.`,
                    href: `/roles/edit?id=${role.id}`,
                })
                reset()
            })
        },
        (response) => {
            setIsLoading(false)
            addToastNotification({
                title: 'Form Validation Error',
                text: response.message,
                type: 'danger',
                href: `/roles/edit?id=${role.id}`,
            })
            throw new SubmissionError(processAPIerrorResponseToFormErrors(response))
        },
    )
}

const AddPermissionFormContainer = compose(
    connect((state) => {
        const selector = formValueSelector('AddPermissionForm')
        const permission = selector(state, 'permission')
        return {
            permission,
        }
    }),
    reduxForm({
        onSubmit,
        validate,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'AddPermissionForm',
        initialValues: {
            name: '',
            role_id: 0,
            permission: 'add',
        },
    }),
)(FormComponent)

export { AddPermissionFormContainer }
export default { AddPermissionFormContainer }
