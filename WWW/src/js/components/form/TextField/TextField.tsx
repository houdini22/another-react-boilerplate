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
        const { onChange, type } = this.props

        if (type === 'file') {
            onChange(e)
        } else {
            onChange(e)
        }
    }
    render() {
        const { error, loading, custom: { size, onChange, ...customProps } = {}, type, value, ...props } = this.props

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
