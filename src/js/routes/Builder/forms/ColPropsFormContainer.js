import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { ColPropsForm as FormComponent } from './ColPropsForm'
import { reduxForm, SubmissionError } from 'redux-form'
import _ from 'lodash'

export const FORM_NAME = 'ColPropsForm'

export const submit = (values, dispatch, props) => {
  return new Promise((resolve) => {
    if (!values['xs']) {
      throw new SubmissionError({
        xs: 'Required.',
      })
    }

    const { addComponent, editComponent, myKey, close } = props

    if (_.isFunction(addComponent)) {
      addComponent('col', myKey, values)
    } else if (_.isFunction(editComponent)) {
      editComponent(myKey, values)
    }

    close()

    resolve()
  })
}

const ColPropsFormContainer = compose(
  connect((state, props) => {
    const { component: { xs, sm, md, lg } = {} } = props
    return {
      initialValues: {
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
      },
    }
  }),
  reduxForm({
    onSubmit: submit,
    enableReinitialize: true,
    destroyOnUnmount: true,
    form: FORM_NAME,
  }),
)(FormComponent)

ColPropsFormContainer.propTypes = {
  component: PropTypes.object,
}

export { ColPropsFormContainer }
export default { ColPropsFormContainer }
