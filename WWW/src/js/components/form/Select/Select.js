import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

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

Select.propTypes = {
    type: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    error: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
}

export { Select }
export default { Select }
