import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { CardForm as FormComponent } from './CardForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (
        !options['header'] &&
        newValues['headerActions'] &&
        !newValues['header']
    ) {
        newValues['header'] = true
    } else if (
        !options['header'] &&
        newValues['withCloseIcon'] &&
        !newValues['header']
    ) {
        newValues['header'] = true
    } else if (
        !options['header'] &&
        newValues['withMinimizeIcon'] &&
        !newValues['header']
    ) {
        newValues['header'] = true
    } else if (options['header'] && !newValues['header']) {
        newValues['headerActions'] = false
        newValues['withCloseIcon'] = false
        newValues['withMinimizeIcon'] = false
    } else if (
        !newValues['footer'] &&
        !options['footer'] &&
        newValues['footerType'] &&
        !options['footerType']
    ) {
        newValues['footer'] = true
    } else if (
        !newValues['footer'] &&
        options['footer'] &&
        newValues['footerType']
    ) {
        newValues['footerType'] = ''
    }

    if (
        !_.isEqual(options, newValues) &&
        newValues['updateCount'] === options['updateCount']
    ) {
        setOptions(newValues)
    }
}

const CardFormContainer = compose(
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
        form: 'CardForm',
    }),
)(FormComponent)

export { CardFormContainer }
export default { CardFormContainer }
