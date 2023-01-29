import * as React from 'react'
import classNames from 'classnames/bind'
import { TextField, Select, Checkbox, TextArea, LoadingOverlay, Radio } from '../../index'
import styles from '../../../../assets/scss/_inputs.scss'
import { OptionsFields } from '../Select/Select'

const cx = classNames.bind(styles)

interface FormFieldProps {
    input: object
    label: string
    type: string
    placeholder: string
    meta: { error: string }
    options: OptionsFields[]
    html(): any
    inputOnly: boolean
    withError: boolean
}

class FormField extends React.Component<FormFieldProps> {
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
            htmlAfter,
            ...custom
        } = this.props

        let inputComponent = null

        switch (type) {
            case 'text':
            case 'number':
            case 'hidden':
            case 'password':
                inputComponent = (
                    <TextField {...input} {...custom} placeholder={placeholder} type={type} error={error} />
                )
                break

            case 'select':
                inputComponent = (
                    <Select {...input} {...custom} options={options} placeholder={placeholder} error={error} />
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
                inputComponent = <TextArea {...input} {...custom} error={error} placeholder={placeholder} />
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
                        {htmlAfter && (
                            <p className={cx('component-form-field__input-container__html-after')}>{htmlAfter}</p>
                        )}
                        {error && withError && (
                            <p className={cx('component-form-field__input-container__error')}>{error}</p>
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
                    {htmlAfter && (
                        <p className={cx('component-form-field__input-container__html-after')}>{htmlAfter}</p>
                    )}
                    {error && <p className={cx('component-form-field__input-container__error')}>{error}</p>}
                </div>
            </div>
        )
    }
}

export { FormField }
export default { FormField }
