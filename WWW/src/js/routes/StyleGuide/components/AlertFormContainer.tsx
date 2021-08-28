import * as React from "react"
import { compose } from 'redux'
import { connect } from 'react-redux'
import { AlertForm as FormComponent } from './AlertForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (!newValues['withIcon']) {
        newValues['iconHighlighted'] = false
        newValues['withIconArrow'] = false
    } else if (newValues['withIcon']) {
        if (
            !options['withIconArrow'] &&
            !options['iconHighlighted'] &&
            newValues['withIconArrow'] &&
            !newValues['iconHighlighted']
        ) {
            newValues['iconHighlighted'] = true
        } else if (
            options['withIconArrow'] &&
            options['iconHighlighted'] &&
            newValues['withIconArrow'] &&
            !newValues['iconHighlighted']
        ) {
            newValues['withIconArrow'] = false
        }
    }

    if (
        !_.isEqual(options, newValues) &&
        newValues['updateCount'] === options['updateCount']
    ) {
        setOptions(newValues)
    }
}

const AlertFormContainer = compose(
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
        form: 'AlertForm',
    }),
)(FormComponent)

export { AlertFormContainer }
export default { AlertFormContainer }
