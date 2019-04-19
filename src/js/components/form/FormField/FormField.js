import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import {
  TextField,
  Select,
  Checkbox,
  TextArea,
  LoadingOverlay,
  Radio,
} from '../../index'
import styles from '../../../../assets/scss/_inputs.scss'

const cx = classNames.bind(styles)

class FormField extends React.Component {
  render() {
    const {
      input,
      label,
      type,
      placeholder,
      meta: { error },
      options,
      html,
      inputOnly,
      withError = true,
      ...custom
    } = this.props

    let inputComponent = null

    switch (type) {
      case 'text':
      case 'number':
      case 'hidden':
      case 'password':
        inputComponent = (
          <TextField
            {...input}
            {...custom}
            placeholder={placeholder}
            type={type}
            error={error}
          />
        )
        break

      case 'select':
        inputComponent = (
          <Select
            {...input}
            {...custom}
            options={options}
            placeholder={placeholder}
            error={error}
          />
        )
        break

      case 'html':
        inputComponent = <div>{html()}</div>
        break

      case 'checkbox':
        inputComponent = <Checkbox {...input} {...custom} error={error} />
        break

      case 'radio':
        inputComponent = <Radio {...input} {...custom} error={error} />
        break

      case 'textarea':
        inputComponent = (
          <TextArea
            {...input}
            {...custom}
            error={error}
            placeholder={placeholder}
          />
        )
        break
    }

    const validationState = !error ? 'success' : 'danger'

    if (inputOnly) {
      return (
        <div
          className={cx('component-form-field', {
            [`component-form-field--state-${validationState}`]: true,
            [`component-form-field--type-${type}`]: type,
          })}
        >
          <div className={cx('component-form-field__input-container')}>
            {inputComponent}
            {error &&
              withError && (
                <p
                  className={cx('component-form-field__input-container__error')}
                >
                  {error}
                </p>
              )}
          </div>
        </div>
      )
    }

    return (
      <div
        className={cx('component-form-field', {
          [`component-form-field--state-${validationState}`]: true,
        })}
      >
        <div className={cx('component-form-field__label')}>
          <label>
            <span>{label}</span>
            {custom['loading'] && <LoadingOverlay size="xs" noBackground />}
          </label>
        </div>
        <div className={cx('component-form-field__input-container')}>
          {inputComponent}
          {error && (
            <p className={cx('component-form-field__input-container__error')}>
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
}

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  options: PropTypes.array,
  html: PropTypes.func,
  inputOnly: PropTypes.bool,
  withError: PropTypes.bool,
}

export { FormField }
export default { FormField }
