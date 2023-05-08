import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SaveFiltersForm as FormComponent } from './SaveFiltersForm'
import { reduxForm } from 'redux-form'

const onSubmit = ({ list_name }, _, { close, saveFilters }) => {
    saveFilters(list_name)
    close()
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
