import * as React from "react"
import _ from 'lodash'

export interface OptionsFields {
    label: string;
    value: string;
};

interface SelectProps {
    type: string;
    placeholder: boolean | string;
    error: string;
    loading: boolean;
    options: () => OptionsFields[] | OptionsFields[]
}

class Select extends React.Component<SelectProps> {
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
