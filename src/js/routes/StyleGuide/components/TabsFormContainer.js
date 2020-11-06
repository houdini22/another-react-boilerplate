import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { TabsForm as FormComponent } from './TabsForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (
        newValues['block'] &&
        newValues['solid'] &&
        options['block'] &&
        !options['solid']
    ) {
        newValues['block'] = false
    } else if (
        newValues['block'] &&
        newValues['solid'] &&
        !options['block'] &&
        options['solid']
    ) {
        newValues['solid'] = false
    } else if (
        newValues['left'] &&
        newValues['below'] &&
        !options['left'] &&
        options['below']
    ) {
        newValues['below'] = false
    } else if (
        newValues['left'] &&
        newValues['below'] &&
        options['left'] &&
        !options['below']
    ) {
        newValues['left'] = false
    }

    if (
        !_.isEqual(options, newValues) &&
        newValues['updateCount'] === options['updateCount']
    ) {
        setOptions(newValues)
    }
}

const TabsFormContainer = compose(
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
        form: 'TabsForm',
    }),
)(FormComponent)

TabsFormContainer.propTypes = {
    options: PropTypes.object.isRequired,
    setOptions: PropTypes.func.isRequired,
}

export { TabsFormContainer }
export default { TabsFormContainer }
