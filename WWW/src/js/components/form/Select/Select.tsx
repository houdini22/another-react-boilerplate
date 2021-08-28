import React from 'react'
import _ from 'lodash'

export interface Option {
    [index: number]: {
        label: string;
        value: string;
    };
}

interface SelectProps {
    type: string;
    options: Option;
    placeholder: boolean | string;
}

class Select extends React.Component {
    renderPlaceholder() {
        const { placeholder } = this.props
        const caption = placeholder === true ? '--- choose ---' : placeholder
        return <option value="">{caption}</option>
    }

    render() {
        const { error, options, loading, placeholder, ...props } = this.props
        const _options = _.isFunction(options) ? options() : options

        return (
            <select {...props}>
                {placeholder && this.renderPlaceholder()}
                {_options.map(({ label, value }) => {
                    return (
                        <option key={value} value={value}>
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