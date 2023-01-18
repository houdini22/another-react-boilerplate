import React from 'react'

interface TextFieldProps {
    error?: string
    size?: string
    loading?: boolean
    custom?: {
        size: string
    }
    placeholder?: string
    type?: string
    onFocus?: Function
    onBlur?: Function
    onChange?: Function
    name: string
}

class TextField extends React.Component<TextFieldProps> {
    render() {
        const {
            error,
            loading,
            className,
            custom: { ...customProps } = {},
            ...props
        } = this.props

        return <input className={className} {...props} {...customProps} />
    }
}

export { TextField }
export default { TextField }
