import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { TableForm as FormComponent } from './TableForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
    const { setOptions, options } = props

    const newValues = {
        ...options,
        ...values,
    }

    if (
        !_.isEqual(options, newValues) &&
        newValues['updateCount'] === options['updateCount']
    ) {
        setOptions(newValues)
    }
}

const TableFormContainer = compose(
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
        form: 'TableForm',
    }),
)(FormComponent)

TableFormContainer.propTypes = {
    options: PropTypes.object.isRequired,
    setOptions: PropTypes.func.isRequired,
}

export { TableFormContainer }
export default { TableFormContainer }
