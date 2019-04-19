import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ButtonForm as FormComponent } from './ButtonForm'
import { reduxForm } from 'redux-form'
import _ from 'lodash'

const onChange = (values, dispatch, props) => {
  const { setOptions, options } = props

  const newValues = {
    ...options,
    ...values,
  }

  if (!options['icon'] && newValues['iconOnly'] && !newValues['icon']) {
    newValues['icon'] = true
  } else if (options['icon'] && !newValues['icon'] && newValues['iconOnly']) {
    newValues['iconOnly'] = false
  }

  if (
    !_.isEqual(options, newValues) &&
    newValues['updateCount'] === options['updateCount']
  ) {
    setOptions(newValues)
  }
}

const ButtonFormContainer = compose(
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
    form: 'ButtonForm',
  }),
)(FormComponent)

ButtonFormContainer.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
}

export { ButtonFormContainer }
export default { ButtonFormContainer }
