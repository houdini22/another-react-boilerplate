import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ProgressForm as FormComponent } from './ProgressForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (!_.isEqual(options, newValues) && newValues['updateCount'] === options['updateCount']) {
        setOptions(newValues)
    }
}

const ProgressFormContainer = compose(
    connect((state, props) => {
        const { options } = props
        return {
            initialValues: options,
        }
    }),
    reduxForm({
        onChange,
        enableReinitialize: true,
        destroyOnUnmount: true,
        form: 'ProgressForm',
    }),
)(FormComponent)

export { ProgressFormContainer }
export default { ProgressFormContainer }
