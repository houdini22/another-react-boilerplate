import React from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../../../../index'

class TextField extends React.Component {
    render() {
        const {
            error,
            loading,
            custom: { size, ...customProps } = {},
            ...props
        } = this.props

        return (
            <AppContext.Consumer>
                {({ cardSize } = {}) => {
                    const size = cardSize || size

                    return <input {...props} {...customProps} />
                }}
            </AppContext.Consumer>
        )
    }
}

TextField.propTypes = {
    error: PropTypes.string,
    size: PropTypes.string,
}

export { TextField }
export default { TextField }
