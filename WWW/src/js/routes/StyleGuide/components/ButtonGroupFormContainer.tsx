import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ButtonGroupForm as FormComponent } from './ButtonGroupForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (options['rounded'] && newValues['roundless']) {
        newValues['rounded'] = false
    } else if (options['roundless'] && newValues['rounded']) {
        newValues['roundless'] = false
    }
    if (!_.isEqual(options, newValues) && newValues['updateCount'] === options['updateCount']) {
        setOptions(newValues)
    }
}

const ButtonGroupFormContainer = compose(
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
        form: 'ButtonGroupForm',
    }),
)(FormComponent)

export { ButtonGroupFormContainer }
export default { ButtonGroupFormContainer }
