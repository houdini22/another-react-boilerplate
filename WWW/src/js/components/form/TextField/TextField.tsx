import * as React from 'react'
import { AppContext } from '../../../../index'

interface TextFieldProps {
    error?: string
    size?: string
    loading?: boolean
    custom?: {
        size: string
    }
    placeholder?: string
    type?: string
    value?: string
    onChange?: Function
}

class TextField extends React.Component<TextFieldProps> {
    input: HTMLInputElement

    onChange(e) {
        const { onChange = (e) => null } = this.props

        onChange(e)
    }
    render() {
        const {
            error,
            loading,
            custom: { size, onChange, ...customProps } = {},
            type,
            value,
            defaultValue = '',
            ...props
        } = this.props
        return (
            <AppContext.Consumer>
                {({ cardSize } = {}) => {
                    const size = cardSize || size

                    return (
                        <input
                            ref={(el) => (this.input = el)}
                            {...props}
                            {...customProps}
                            type={type}
                            value={type !== 'file' ? value : ''}
                            defaultValue={type !== 'file' ? defaultValue || '' : undefined}
                            key={type !== 'file' ? defaultValue || '' : undefined}
                            onChange={this.onChange.bind(this)}
                        />
                    )
                }}
            </AppContext.Consumer>
        )
    }
}

export { TextField }
export default { TextField }
