import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ListForm as FormComponent } from './ListForm'
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

const ListFormContainer = compose(
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
    form: 'ListForm',
  }),
)(FormComponent)

ListFormContainer.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
}

export { ListFormContainer }
export default { ListFormContainer }
