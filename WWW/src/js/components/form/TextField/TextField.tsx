import * as React from "react"
import { AppContext } from '../../../../index'

interface TextFieldProps {
    error: string;
    size: string
    loading: boolean;
    custom: {
        size: string;
    }
}

class TextField extends React.Component<TextFieldProps> {
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

export { TextField }
export default { TextField }
