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
    options: () => OptionsFields[] | OptionsFields[]
}

class Select extends React.Component<SelectProps> {
    renderPlaceholder() {
        const { placeholder } = this.props
        const caption = placeholder === true ? '--- choose ---' : placeholder
        return <option value="">{caption}</option>
    }

    render() {
        const { error, options, loading, placeholder, value, ...props } = this.props
        const _options = _.isFunction(options) ? options() : options

        return (
            <select {...props}>
                {placeholder && this.renderPlaceholder()}
                {_options.map(({ label, value: _value, disabled, selected }) => {
                    return (
                        <option key={_value} value={_value} disabled={disabled} selected={selected || value === _value}>
                            {label}
                        </option>
                    )
                })}
            </select>
        )
    }
}

export { Select }
export default { Select }
