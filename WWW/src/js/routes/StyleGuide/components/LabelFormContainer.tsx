import * as React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { LabelForm as FormComponent } from './LabelForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (newValues['roundless'] && options['rounded']) {
        newValues['rounded'] = false
        newValues['striped'] = false
    } else if (newValues['rounded'] && options['roundless']) {
        newValues['roundless'] = false
        newValues['striped'] = false
    } else if (newValues['outline']) {
        newValues['striped'] = false
    } else if (newValues['striped']) {
        newValues['rounded'] = false
        newValues['roundless'] = false
        newValues['outline'] = false
    }

    if (
        !_.isEqual(options, newValues) &&
        newValues['updateCount'] === options['updateCount']
    ) {
        setOptions(newValues)
    }
}

const LabelFormContainer = compose(
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
        form: 'LabelForm',
    }),
)(FormComponent)

export { LabelFormContainer }
export default { LabelFormContainer }
