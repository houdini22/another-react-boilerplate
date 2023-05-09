import * as React from 'react'
import _ from 'lodash'

export interface OptionsFields {
    label: string
    value: string
}

interface SelectProps {
    type: string
    placeholder: boolean | string
    error: string
    loading: boolean
    options: () => OptionsFields[]
}

class Select extends React.Component<SelectProps, null> {
    renderPlaceholder() {
        const { placeholder } = this.props
        const caption = placeholder === true ? '--- choose ---' : placeholder
        return <option value="">{caption}</option>
    }

    render() {
        const { error, options, loading, placeholder, value, defaultValue, ...props } = this.props
        const _options = _.isFunction(options) ? options() : options

        const val = value || defaultValue

        return (
            <select {...props} key={val || ''} value={val || ''}>
                {placeholder && this.renderPlaceholder()}
                {_options.map(({ label, value: _value, disabled }) => {
                    return (
                        <option key={_value} value={_value} disabled={disabled}>
                            {label}
                        </option>
                    )
                })}
            </select>
        )
    }
}

export { Select }
