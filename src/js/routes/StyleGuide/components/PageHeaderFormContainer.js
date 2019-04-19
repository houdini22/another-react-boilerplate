import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { PageHeaderForm as FormComponent } from './PageHeaderForm'
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
    values['updateCount'] === options['updateCount']
  ) {
    setOptions(newValues)
  }
}

const PageHeaderFormContainer = compose(
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
    form: 'PageHeaderForm',
  }),
)(FormComponent)

PageHeaderFormContainer.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
}

export { PageHeaderFormContainer }
export default { PageHeaderFormContainer }
