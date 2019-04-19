import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { FormField } from '../../index'

export class LoginForm extends React.Component {
  render() {
    const {
      handleSubmit,
      initialValues: { username },
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="username"
          component={FormField}
          type="text"
          placeholder="E-mail"
          inputOnly
          autoComplete="off"
          size="sm"
          autoFocus={!username}
        />
        <Field
          name="password"
          component={FormField}
          type="password"
          placeholder="Password"
          inputOnly
          autoComplete="off"
          size="sm"
          autoFocus={!!username}
        />
      </form>
    )
  }
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm
