import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SaveFiltersForm as FormComponent } from './SaveFiltersForm'
import { reduxForm } from 'redux-form'
import { LocalStorage } from '../../../modules/database'

const onSubmit = (values, _, { closeModal, name, filters }) => {
    console.log({ ...values, filters, name })

    const toSave = { ...values, filters, name }

    LocalStorage.insertOrUpdate('ListManagerFilters', { name, list_name: values.list_name }, toSave)
    LocalStorage.commit()

    closeModal('save-filters')
}

const validate = (values) => {
    const errors = {}

    if (!values.list_name) {
        errors['list_name'] = 'Field is required.'
    }

    return errors
}

const SaveFiltersFormContainer = compose(
    connect((state, props) => {
        return {}
    }),
    reduxForm({
        onSubmit,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'save-filters-form',
        initialValues: {
            list_name: '',
        },
        validate,
    }),
)(FormComponent)

export { SaveFiltersFormContainer }
export default { SaveFiltersFormContainer }
